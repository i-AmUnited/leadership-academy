import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Achievements, AdmissionRequestList, BlogDetail, BlogList, ContactUsRequestList, GalleryList, SingleAdmissionDetails, StaffList } from '../hooks/local/reducer';


export function useAchievements() {
  const [listAchievements, setListAchievements] = useState([])
  const dispatch = useDispatch();
  
  const fetchAchievements = async() => {
    try {
        const {payload} = await dispatch(Achievements());
        setListAchievements(payload.result);
    }
    catch(e){}
  }
  
  useEffect(() => {
    fetchAchievements();
  }, [dispatch]);

  return { achievements: listAchievements, refetch: fetchAchievements };
}

export function useAdmissionRequestList() {
  const [listAdmissionRequests, setListAdmissionRequests] = useState([])
  const dispatch = useDispatch();
  
  const fetchAdmissionRequests = async() => {
    try {
        const {payload} = await dispatch(AdmissionRequestList());
        setListAdmissionRequests(payload.result);
    }
    catch(e){}
  }
  
  useEffect(() => {
    fetchAdmissionRequests();
  }, [dispatch]);

  return { requests: listAdmissionRequests, refetch: fetchAdmissionRequests };
}

export function useSingleAdmissionDetail(admissionID) {
  const [singleAdmission, setSingleAdmission] = useState([])
  const dispatch = useDispatch();
  
  const fetchAdmissionDetail = async() => {
    try {
        const {payload} = await dispatch(SingleAdmissionDetails(admissionID));
        setSingleAdmission(payload?.result?.[0]);
    }
    catch(e){}
  }
  
  useEffect(() => {
    fetchAdmissionDetail();
  }, [dispatch]);

  return { singleAdmission };
}

export function useContactUsRequestList() {
  const [listContactRequests, setListContactRequests] = useState([])
  const dispatch = useDispatch();
  
  const fetchContactRequests = async() => {
    try {
        const {payload} = await dispatch(ContactUsRequestList());
        setListContactRequests(payload.result);
        // console.log(payload.result);
    }
    catch(e){}
  }
  
  useEffect(() => {
    fetchContactRequests();
  }, [dispatch]);

  return { requests: listContactRequests, refetch: fetchContactRequests };
}

export function useBlogList() {
  const [listBlogPosts, setListBlogPosts] = useState([])
  const dispatch = useDispatch();
  
  const fetchBlogPosts = async() => {
    try {
        const {payload} = await dispatch(BlogList());
        setListBlogPosts(payload.result);
        // console.log(payload.result);
    }
    catch(e){}
  }
  
  useEffect(() => {
    fetchBlogPosts();
  }, [dispatch]);

  return { posts: listBlogPosts, refetch: fetchBlogPosts };
}

export function useBlogDetail(blogID) {
  const [blogDetail, setBlogDetail] = useState([])
  const dispatch = useDispatch();
  
  const fetchBlogDetail = async() => {
    try {
        const {payload} = await dispatch(BlogDetail(blogID));
        setBlogDetail(payload.result);
        // console.log(payload.result, "kjjkbj");
    }
    catch(e){}
  }
  
  useEffect(() => {
    fetchBlogDetail();
  }, [dispatch]);

  return { detail: blogDetail, refetch: fetchBlogDetail };
}

export function useStaffList() {
  const [listStaff, setListStaff] = useState([])
  const dispatch = useDispatch();
  
  const fetchStaff = async() => {
    try {
        const {payload} = await dispatch(StaffList());
        setListStaff(payload.result);
        // console.log(payload.result);
    }
    catch(e){}
  }
  
  useEffect(() => {
    fetchStaff();
  }, [dispatch]);

  return { staff: listStaff, refetch: fetchStaff };
}

export function useGalleryList() {
  const [listGallery, setListGallery] = useState([])
  const dispatch = useDispatch();
  
  const fetchGallery = async() => {
    try {
        const {payload} = await dispatch(GalleryList());
        setListGallery(payload.result);
        // console.log(payload.result);
    }
    catch(e){}
  }
  
  useEffect(() => {
    fetchGallery();
  }, [dispatch]);

  return { gallery: listGallery, refetch: fetchGallery };
}