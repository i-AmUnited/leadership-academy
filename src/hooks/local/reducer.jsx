import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { showErrorToast, showSuccessToast, } from "../constants";
import {apiEndPoints} from '../remote/apiEndPoints';

const initialState = {
    users: null,
    loading: false,
    error: null,
    isAuthenticated: false,
}

export const Achievements = createAsyncThunk(
  "user/achievements",
  async() => {
      const achievementsEndPoint = await apiEndPoints.listAchievements();
      const response = await achievementsEndPoint.data;
      return response;
  }
)

export const CreateAchievements = createAsyncThunk(
  "user/createAchievements",
  async(data) => {
      const createAchievementsEndPoint = await apiEndPoints.createAchievements(data);
      const response = await createAchievementsEndPoint.data;
      return response;
  }
)

export const UpdateAchievements = createAsyncThunk(
  "user/updateAchievements",
  async(data) => {
      const updateAchievementsEndPoint = await apiEndPoints.updateAchievements(data);
      const response = await updateAchievementsEndPoint.data;
      return response;
  }
)

export const ToggleAchievement = createAsyncThunk(
  "user/toggleAchievement",
  async ({ achievementID, status }) => {
    const toggleAchievementEndPoint = await apiEndPoints.toggleAchievementStatus(achievementID, status);
    const response = await toggleAchievementEndPoint.data;
    return response;
  }
);

export const CreateAdmission = createAsyncThunk(
  "user/createAdmissionRequest",
  async(data) => {
      const createAdmissionEndPoint = await apiEndPoints.createAdmissionRequest(data);
      const response = await createAdmissionEndPoint.data;
      return response;
  }
)

export const AdmissionRequestList = createAsyncThunk(
  "user/admissionRequestList",
  async() => {
      const admissionListEndpoint = await apiEndPoints.listAdmissionRequest();
      const response = await admissionListEndpoint.data;
      return response;
  }
)

export const SingleAdmissionDetails = createAsyncThunk(
  "user/singleAdmissionDetails",
  async ( admissionID ) => {
    const singleAdmissionEndPoint = await apiEndPoints.singleAdmissionRequest(admissionID);
    const response = await singleAdmissionEndPoint.data;
    return response;
  }
);

export const ContactUsRequestList = createAsyncThunk(
  "user/contactUsRequestList",
  async() => {
      const contactUsListEndpoint = await apiEndPoints.listContactUsRequest();
      const response = await contactUsListEndpoint.data;
      // console.log("sdkjnsjd")
      return response;
  }
)

export const CreateContactUsRequest = createAsyncThunk(
  "user/createContactUsRequest",
  async(data) => {
      const createContactEndPoint = await apiEndPoints.createContactUsRequest(data);
      const response = await createContactEndPoint.data;
      return response;
  }
)

export const BlogList = createAsyncThunk(
  "user/blogPostList",
  async() => {
      const blogPostListEndpoint = await apiEndPoints.listBlogPosts();
      const response = await blogPostListEndpoint.data;
      return response;
  }
)

export const BlogDetail = createAsyncThunk(
  "user/blogDetail",
  async (blogID) => {
    const blogDetailEndPoint = await apiEndPoints.singleBlogPost(blogID);
    const response = await blogDetailEndPoint.data;
    // console.log(response)
    return response;
  }
);

export const UpdateBlog = createAsyncThunk(
  "user/updateBlogImage",
  async(data) => {
      const updatePostEndPoint = await apiEndPoints.updateBlogPost(data);
      const response = await updatePostEndPoint.data;
      return response;
  }
)

export const CreateBlog = createAsyncThunk(
  "user/createBlogImage",
  async(data) => {
      const createPostEndPoint = await apiEndPoints.createBlogPost(data);
      const response = await createPostEndPoint.data;
      return response;
  }
)

export const StaffList = createAsyncThunk(
  "user/staffList",
  async() => {
      const staffListEndpoint = await apiEndPoints.listStaff();
      const response = await staffListEndpoint.data;
      return response;
  }
)

export const GalleryList = createAsyncThunk(
  "user/galleryList",
  async() => {
      const galleryListEndpoint = await apiEndPoints.listGallery();
      const response = await galleryListEndpoint.data;
      return response;
  }
)

const slice = createSlice ({
  name: "user",
  initialState : initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Achievements.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status_code === "0") {
          state.users = action.payload.result;
        } else {
          state.error = action.payload.message;
          showErrorToast(action.payload.message);
        }
      })

      .addMatcher(
        isAnyOf(
          AdmissionRequestList.fulfilled,
          ContactUsRequestList.fulfilled,
          BlogList.fulfilled,
          BlogDetail.fulfilled,
          StaffList.fulfilled, 
          GalleryList.fulfilled
        ),
        (state, action) => {
        state.loading = false;
        if (action.payload.status_code === "0") {
          state.users = action.payload.result;
        } else {
          state.error = action.payload.message;
          showErrorToast(action.payload.message);
        }
      })

      .addMatcher(
        isAnyOf(
          CreateAchievements.fulfilled,
          UpdateAchievements.fulfilled,
          ToggleAchievement.fulfilled,
          CreateAdmission.fulfilled,
          SingleAdmissionDetails.fulfilled,
          CreateContactUsRequest.fulfilled,
          UpdateBlog.fulfilled, 
          CreateBlog.fulfilled
        ),
        (state, action) => {
          state.loading = false;
          if (action.payload.status_code === "0") {
            state.users = action.payload;
            showSuccessToast(action.payload.message)
          } else {
            state.error = action.payload.message;
            showErrorToast(action.payload.message);
          }
        }
      )
      .addMatcher(
        isAnyOf(
          Achievements.pending,
          CreateAchievements.pending,
          UpdateAchievements.pending,
          ToggleAchievement.pending,
          CreateAdmission.pending,
          AdmissionRequestList.pending,
          SingleAdmissionDetails.pending,
          ContactUsRequestList.pending,
          CreateContactUsRequest.pending,
          BlogList.pending,
          BlogDetail.pending,
          StaffList.pending,
          GalleryList.pending,
          UpdateBlog.pending,
          CreateBlog.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
          state.users = null;
        }
      )
      .addMatcher(
        isAnyOf(
          Achievements.rejected,
          CreateAchievements.rejected,
          UpdateAchievements.rejected,
          ToggleAchievement.rejected,
          CreateAdmission.rejected,
          AdmissionRequestList.rejected,
          SingleAdmissionDetails.rejected,
          ContactUsRequestList.rejected,
          CreateContactUsRequest.rejected,
          BlogList.rejected,
          BlogDetail.rejected,
          StaffList.rejected,
          GalleryList.rejected,
          UpdateBlog.rejected,
          CreateBlog.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = showErrorToast(action.error.message);
          state.users = null;
        }
      );
  }
})

export const userReducer = slice.reducer;