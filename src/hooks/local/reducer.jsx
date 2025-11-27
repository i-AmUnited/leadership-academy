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
  async() => {
      const createAchievementsEndPoint = await apiEndPoints.createAchievements();
      const response = await createAchievementsEndPoint.data;
      return response;
  }
)

export const UpdateAchievements = createAsyncThunk(
  "user/updateAchievements",
  async() => {
      const updateAchievementsEndPoint = await apiEndPoints.updateAchievements();
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
  async() => {
      const createAdmissionEndPoint = await apiEndPoints.createAdmissionRequest();
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
  async() => {
      const createContactEndPoint = await apiEndPoints.createContactUsRequest();
      const response = await createContactEndPoint.data;
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
          ContactUsRequestList.fulfilled
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
          CreateContactUsRequest.fulfilled
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
          CreateContactUsRequest.pending
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
          CreateContactUsRequest.rejected
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