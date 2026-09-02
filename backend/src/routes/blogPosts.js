const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const slugify = require('../utils/slugify');
const { protect } = require('../middleware/auth');

/**
 * Generates a unique slug for a blog post.
 */
const generateUniqueSlug = async (title, currentId = null) => {
  let baseSlug = slugify(title);
  if (!baseSlug) baseSlug = 'post';

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await BlogPost.findOne({ slug });
    if (!existing || (currentId && existing._id.toString() === currentId.toString())) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

// @route   GET /api/blog-posts
// @desc    List published blog posts with pagination and category filter
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { category, include_drafts } = req.query;

    const query = {};
    if (include_drafts !== 'true') {
      query.is_published = true;
    }
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const total = await BlogPost.countDocuments(query);
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      count: posts.length,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/blog-posts/:slug
// @desc    Get single published post by slug (or ID)
// @access  Public
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Try finding by slug first, or by ID if it's a valid ObjectId
    let post = await BlogPost.findOne({ slug });

    if (!post && slug.match(/^[0-9a-fA-F]{24}$/)) {
      post = await BlogPost.findById(slug);
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/blog-posts
// @desc    Create blog post (Auto generates slug)
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, excerpt, content, image_url, category, author, is_published, slug: customSlug } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Blog post title is required',
      });
    }

    const slug = customSlug
      ? await generateUniqueSlug(customSlug)
      : await generateUniqueSlug(title);

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      image_url,
      category,
      author,
      is_published: is_published !== undefined ? is_published : false,
    });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/blog-posts/:id
// @desc    Update blog post
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    const updateData = { ...req.body };

    // Update slug if explicit slug provided or if title changed
    if (updateData.slug) {
      updateData.slug = await generateUniqueSlug(updateData.slug, post._id);
    } else if (updateData.title && updateData.title !== post.title) {
      updateData.slug = await generateUniqueSlug(updateData.title, post._id);
    }

    post = await BlogPost.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/blog-posts/:id
// @desc    Delete blog post
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Blog post removed successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
