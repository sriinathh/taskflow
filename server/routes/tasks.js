const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { completed, category, priority, sort = '-createdAt', limit = 50, page = 1 } = req.query;

    // Build filter object
    const filter = { user: req.user._id };

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (priority && priority !== 'all') {
      filter.priority = priority;
    }

    // Parse sort parameter
    let sortOption = {};
    if (sort.startsWith('-')) {
      sortOption[sort.substring(1)] = -1;
    } else {
      sortOption[sort] = 1;
    }

    const tasks = await Task.find(filter)
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('assignedTo', 'firstName lastName email')
      .populate('subtasks');

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get a single task
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('assignedTo', 'firstName lastName email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    res.status(500).json({ message: 'Server error fetching task' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      priority = 'medium',
      category = 'personal',
      dueDate,
      tags = [],
      estimatedTime
    } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = new Task({
      title: title.trim(),
      description: description?.trim(),
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : null,
      tags,
      estimatedTime,
      user: req.user._id
    });

    await task.save();

    // Populate assignedTo if needed
    await task.populate('assignedTo', 'firstName lastName email');

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error creating task' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const allowedFields = [
      'title', 'description', 'completed', 'priority', 'category',
      'dueDate', 'tags', 'assignedTo', 'timeSpent', 'estimatedTime'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        if (key === 'dueDate' && req.body[key]) {
          updates[key] = new Date(req.body[key]);
        } else {
          updates[key] = req.body[key];
        }
      }
    });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'firstName lastName email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    res.status(500).json({ message: 'Server error updating task' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Also delete any subtasks
    await Task.deleteMany({ parentTask: req.params.id });

    res.json({
      message: 'Task deleted successfully',
      task: { id: task._id, title: task.title }
    });
  } catch (error) {
    console.error('Delete task error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    res.status(500).json({ message: 'Server error deleting task' });
  }
});

// @route   GET /api/tasks/stats/overview
// @desc    Get task statistics overview
// @access  Private
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      tasksByCategory,
      tasksByPriority
    ] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, completed: true }),
      Task.countDocuments({ user: userId, completed: false }),
      Task.countDocuments({
        user: userId,
        completed: false,
        dueDate: { $lt: new Date() }
      }),
      Task.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Task.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ])
    ]);

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      overview: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        overdue: overdueTasks,
        completionRate
      },
      byCategory: tasksByCategory,
      byPriority: tasksByPriority
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Server error fetching statistics' });
  }
});

// @route   POST /api/tasks/:id/notes
// @desc    Add a note to a task
// @access  Private
router.post('/:id/notes', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Note content is required' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        $push: {
          notes: {
            content: content.trim(),
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Note added successfully',
      task
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ message: 'Server error adding note' });
  }
});

module.exports = router;