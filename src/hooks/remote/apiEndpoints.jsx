import { showErrorToast } from "../constants";
import { formDataApiClient } from "./apiClient";
import { apiClient } from "./apiClient";

export class apiEndPoints {
  static extractError(error) {
    let extracted;
    if (error.isAxiosError) {
      if (error.request) {
        extracted = ["Network error"];
      } else if (error.response) {
        extracted = [error.response.message];
      } else {
        extracted = ["An unexpected error occured"];
      }
    } else {
      extracted = [error.response.message || "An unexpected error occurred"];
    }
    extracted.forEach((error) => showErrorToast(error));
  }

  static async listAchievements(data) {
    try {
      return apiClient.get("/get_achievements", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async createAchievements(data) {
    try {
      return apiClient.post("/create_achievement", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async updateAchievements(data) {
    try {
      return apiClient.post("/update_achievement", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async toggleAchievementStatus(achievementID, status) {
    try {
      return formDataApiClient.post(`/toggle_achievement_status?id=${achievementID}&status=${status}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async createAdmissionRequest(data) {
    try {
      return apiClient.post("/create_save_admission_request", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listAdmissionRequest(data) {
    try {
      return formDataApiClient.get("/get_admission_request", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async singleAdmissionRequest(admissionID) {
    try {
      return formDataApiClient.get(`/get_admission_request?id=${admissionID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listContactUsRequest(data) {
    try {
      return formDataApiClient.get("/get_contact_us_request", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async createContactUsRequest(data) {
    try {
      return apiClient.post("/create_contact_us_request", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listBlogPosts(data) {
    try {
      return formDataApiClient.get("/get_news_events", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async createBlogPost(data) {
    try {
      return formDataApiClient.post("/create_news_event", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async updateBlogPost(data) {
    try {
      return formDataApiClient.post("/update_news_event", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async updateBlogPostImage(data) {
    try {
      return apiClient.post("/update_news_event_image", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async singleBlogPost(blogID) {
    try {
      return formDataApiClient.get(`/get_news_event?id=${blogID}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async togglePostStatus(postID, status) {
    try {
      return apiClient.post(`/toggle_news_event_status?id=${postID}&status=${status}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listStaff(data) {
    try {
      return formDataApiClient.get("/get_our_staffs", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async createStaff(data) {
    try {
      return apiClient.post("/create_our_staff", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async updateStaff(data) {
    try {
      return apiClient.post("/update_our_staff", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async updateStaffImage(data) {
    try {
      return apiClient.post("/update_our_staff_image", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async toggleStaffStatus(staffID, status) {
    try {
      return formDataApiClient.post(`/toggle_our_staff_status?id=${staffID}&status=${status}`);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

  static async listGallery(data) {
    try {
      return formDataApiClient.get("/get_galleries", data);
    } catch (error) {
      apiEndPoints.extractError(error);
      throw error;
    }
  }

}