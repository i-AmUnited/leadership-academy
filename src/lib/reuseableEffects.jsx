import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Achievements, AdmissionRequestList, ContactUsRequestList, SingleAdmissionDetails } from '../hooks/local/reducer';


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