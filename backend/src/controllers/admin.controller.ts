import { Request, Response } from "express";
import User, { IUser } from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import BlogView from "../models/blogView.model.js";

export const BlockUser = async (req: Request, res: Response) => {
  try {
    const useremail = req.params.email;

    const user = await User.findOne({ email: useremail });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    user.isActive = false;

    await user.save();

    return res.status(200).json({
      success: true,
      msg: "User blocked successfully",
      user,
    });
  } catch (error) {
    console.error("Block user error:", error);

    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export const getBlockedUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isActive: false });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get blocked users error:", error);

    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export const unblockUser = async (req: Request, res: Response) => {
  try {
    const useremail = req.params.email;

    const user = await User.findOne({ email: useremail });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    if (user.isActive === true) {
      return res.status(409).json({
        success: false,
        msg: "User is already active",
      });
    }

    user.isActive = true;

    await user.save();

    return res.status(200).json({
      success: true,
      msg: "User unblocked successfully",
      user,
    });
  } catch (error) {
    console.error("Unblock user error:", error);

    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export const makeEditor = async (req: Request, res: Response) => {
  try {
    const useremail = req.params.email;

    const user = await User.findOne({ email: useremail });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    if (user.role === "EDITOR") {
      return res.status(409).json({
        success: false,
        msg: "User is already an editor",
      });
    }

    user.role = "EDITOR";

    await user.save();

    return res.status(200).json({
      success: true,
      msg: "User promoted to editor successfully",
      user,
    });
  } catch (error) {
    console.error("Make editor error:", error);

    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export const removeEditor = async (req: Request, res: Response) => {
  try {
    const useremail = req.params.email;

    const user = await User.findOne({ email: useremail });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    if (user.role !== "EDITOR") {
      return res.status(409).json({
        success: false,
        msg: "User is not an editor",
      });
    }

    user.role = "READER";

    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Editor role removed successfully",
      user,
    });
  } catch (error) {
    console.error("Remove editor error:", error);

    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const result = await Blog.aggregate([
      {
        $match: {
          status: "PUBLISHED",
        },
      },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
          totalBlogs: { $sum: 1 },
        },
      },
    ]);

    const analytics = result[0] || {
      totalViews: 0,
      totalBlogs: 0,
    };

    return res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
};

export const getBlogAnalytics = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find(
      { status: "PUBLISHED" },
      {
        title: 1,
        slug: 1,
        views: 1,
        createdAt: 1,
      },
    ).sort({ views: -1 });

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Blog analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog analytics",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-accessToken");
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get all user",
    });
  }
};

export const getAUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing",
      });
    }

    const UserExists = await User.findById(userId).select("-accessToken");

    if (!UserExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: UserExists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get a user",
    });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const allowedRoles = ["READER", "PUBLISHER", "ADMIN", "EDITOR"] as const;
    const userId = req.params.userId;
    const { role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "User ID or Role is missing",
      });
    }

    if (typeof role !== "string" || !allowedRoles.includes(role as any)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    const UserExists = await User.findById(userId).select("-accessToken");

    if (!UserExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    UserExists.role = role as IUser["role"];
    await UserExists.save();

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: UserExists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update a user",
    });
  }
};

export const getTop2Content = async (req: Request, res: Response) => {
  try {
    const [research, blogs] = await Promise.all([
      Blog.find({ docType: "RESEARCH" }).sort({ createdAt: -1 }).limit(2),

      Blog.find({ docType: "BLOG" }).sort({ createdAt: -1 }).limit(2),
    ]);

    const allContent = [...research, ...blogs];

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      content: allContent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all content",
    });
  }
};

export const getStatisticalContentData = async (
  req: Request,
  res: Response,
) => {
  try {
    const allContent = await Blog.find({}).select("-content");
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      content: allContent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get data",
    });
  }
};

export const getViewsTimeseries = async (req: Request, res: Response) => {
  try {
    const range = (req.query.range as string) || "7d";
    const now = new Date();
    let since: Date | null = null;

    if (range === "7d")
      since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    else if (range === "30d")
      since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    // "all" -> since stays null, no date filter

    const match: Record<string, any> = since
      ? { viewedAt: { $gte: since } }
      : {};

    const [byDay, byBlog, totalInRange] = await Promise.all([
      // Daily bucket, for the "Views over Time" line chart
      BlogView.aggregate([
        { $match: match },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$viewedAt" },
            },
            views: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Per-blog bucket, for "Views by Blog" / Top Performing Blogs
      BlogView.aggregate([
        { $match: match },
        { $group: { _id: "$blog", views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "blogs",
            localField: "_id",
            foreignField: "_id",
            as: "blog",
          },
        },
        { $unwind: "$blog" },
        {
          $project: {
            _id: "$blog._id",
            title: "$blog.title",
            slug: "$blog.slug",
            views: 1,
            createdAt: "$blog.createdAt",
          },
        },
      ]),

      BlogView.countDocuments(match),
    ]);

    return res.status(200).json({
      success: true,
      range,
      totalViewsInRange: totalInRange,
      byDay, // [{ _id: "2026-09-24", views: 12 }, ...]
      byBlog, // [{ _id, title, slug, views, createdAt }, ...]
    });
  } catch (err: any) {
    console.error("getViewsTimeseries error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
