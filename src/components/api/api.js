import axios from 'axios'

// import FormData from "form-data";

axios.defaults.baseURL = 'http://ec2-3-96-139-77.ca-central-1.compute.amazonaws.com:8000'

// axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.common['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';
// axios.defaults.headers.common['Authorization'] = 'Token 1c10a1a9d7d8973d860aac56c07a8fd588fb0527';

// let userId=2
// let USER_NAME='sagar'

//SAMPLE USE CASE
// const request = api.getArticle(match.params.id)

// request
//     .then(res => {
//         this.setState({
//             post: res.data.results
//         })
//     }).catch(err => toast.error(err.response.data.error))

// axios.interceptors.request.use(config => {
//   if (localStorage.getItem('access-token'))
//     config.headers['access-token'] = localStorage.getItem('access-token')
//   config.headers['Content-Type'] = 'application/json;charset=UTF-8';
//   return config

const signInFunc = (user, callback=null) => {
  axios.post('booktrades_api/login/', user).then(res => {
    //Sample response: {"token":"1c10a1a9d7d8973d860aac56c07a8fd588fb0527",
  //                    "user_id":2,
  //                    "email":"sagar.aryal.1996@gmail.com"
  // }
    localStorage.setItem('access-token', res.data['token']);
    localStorage.setItem('user_name', user['username']);
    localStorage.setItem('usertype', res.data['usertype']);

    if(res.data['usertype'] === 'Contractor'){
      localStorage.setItem('user_id', res.data['contractor_id']);
    }
    else{
      localStorage.setItem('user_id', res.data['client_id']);
    }
    axios.defaults.headers.common['Authorization'] = `Token ${res.data['token']}`
    localStorage.setItem('user_token', localStorage.getItem('user_id'));
    localStorage.setItem('contractor_id', res.data['contractor_id'])
    localStorage.setItem('client_id', res.data['client_id'])
    if (callback){
      callback(res.data);
    }
    sendMessagingTokenFunc('');
  }).catch(err => callback(err))
}

const sendMessagingTokenFunc = (token) => {
  if (token !== ''){
    localStorage.setItem('messaging-token', token);
  }
  if ( localStorage.hasOwnProperty('messaging-token')){
    const data = {}
    data['user_id'] = localStorage.getItem('user_token');
    // token['username'] = localStorage.getItem('user_name');
    // token['access-token'] = localStorage.getItem('access-token');
    data['web_token'] = localStorage.getItem('messaging-token');
    axios.post('api/msg_token/', data).then(res => {
      console.log('INFO: Messaging token sent to backend');
    }).catch(err => console.log('ERROR: Messaging token sending error'))
  }
}

const signUpFunc = (information,callback, err_callback) => {
  information['username'] = information['email'];
  information['firstName'] = information['first_name'];
  information['lastName'] = information['last_name'];
  // if(information['service_types'] != null){
    // information['serviceList'] = information['service_types'].join(',')

  // information['serviceTypeList'] = information['service_types']
  // }
  // information['languageList'] = information['languages']
  axios.post('booktrades_api/user/create/', information).then(res => {
    localStorage.setItem('access-token', res.data['token']);
    localStorage.setItem('user_name', res.data['email']);
    localStorage.setItem('usertype', res.data['usertype']);
    if(res.data['usertype'] === 'Contractor'){
      localStorage.setItem('user_id', res.data['contractor_id']);
    }
    else{
      localStorage.setItem('user_id', res.data['client_id']);
    }
    axios.defaults.headers.common['Authorization'] = `Token ${res.data['token']}`
    localStorage.setItem('user_token', res.data['user_id']);
    localStorage.setItem('contractor_id', res.data['contractor_id'])
    localStorage.setItem('client_id', res.data['client_id'])

    let originalResponse = res.data;
    sendMessagingTokenFunc('');
    //Uploading profile image
    if (information.profile_image.length > 0){ //Only one profile image can be uploaded
      //Uploading image
      let data = new FormData();
      for (var k in res['data']['profile_upload_url']['fields']) {
        data.append(k, res['data']['profile_upload_url']['fields'][k]);
      }
    
      data.append('file', information.profile_image[0]['file'], information.profile_image[0]['file'].fileName);
      delete axios.defaults.headers.common['Authorization'];
      axios.post(
        res.data['profile_upload_url']['url'], 
        data, 
        {
          headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          }
        }).then(res => {
          console.log('Successfully uploaded');
          callback(originalResponse)
          axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
      }).catch(err => {
        err_callback()
        console.log(err);
      });
    }else{
      callback(originalResponse);
    }
  }).catch((err) => {
    console.log(err)
    err_callback()
  })
}

let all_languages = []
let language_promise;
if (all_languages === undefined || all_languages.length === 0) {
  // array empty or does not exist
  language_promise = axios.get('booktrades_api/languages/get_all/', { params: {} }).then(res => {
    all_languages.push(...res.data);
    return all_languages;
  }).catch(err => {
    console.log(err) 

  });
}

const allLanguages = () => {
  if (all_languages === undefined || all_languages.length === 0) {
    // array empty or does not exist
    return language_promise
  }else{
    return all_languages
  }
}

let service_types = []
let service_promise;
if (service_types === undefined || service_types.length === 0) {
  // array empty or does not exist
  service_promise = axios.get('booktrades_api/service_types/get_all/', { params: {} }).then(res => {
    service_types.push(...res.data);
    return service_types
  }).catch(err => {
    console.log(err) 
  });
}
const allServiceTypes = () => {
  if (service_types === undefined || service_types.length === 0) {
    // array empty or does not exist
    return service_promise
  }else{
    return service_types
  }
}

export const getLatLng = (address) => {
  delete axios.defaults.headers.common['Authorization'];
  let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBQbOVpM2UKKRF82lw8OVr2KhKKysfjZSU`
  const promise = axios.get(endpoint);
  axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
  return promise
};

export {allServiceTypes, allLanguages, service_types, all_languages};

export default {
  // Signing
  // user_name:USER_NAME, 
  // register: (user) => {
  //   return axios.post('signing/signUp', user)
  // },
  
  serviceTypes: service_types,

  languages: all_languages,

  signIn: signInFunc,

  signUp: signUpFunc,

  // getGeoCode: (address) => {
  //   return axios.get('https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY'
  // }

  cancelSignUp: (information) => {
    axios.post('booktrades_api/user/cancel/', information).then((res)=>{
      console.log('success')
    }).catch((res)=>{
      // debugger;
      console.log('error');
    })
    return
  },

  sendMessagingToken: sendMessagingTokenFunc,
  
  signOut: () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('usertype')
  },

  // // Chat
  getMessages: (receiverId) => {
    const headers = { headers:{Authorization: `Token ${localStorage.getItem('access-token')}` }}
    return axios.get('api/messages/'+localStorage.getItem('user_token')+'/'+receiverId, )
  },

  sendMessage: (message_data) => {
    message_data['sender']=localStorage.getItem('user_token')
    const dt = new Date();
    message_data['timestamp']= dt.toISOString();
    return axios.post('api/messages/'+localStorage.getItem('user_token')+'/'+message_data['receiver'], message_data)
  },

  getChats: () => {
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('api/user/'+localStorage.getItem('user_token'), { params: {} })
  },

  addUnassignedJob: (job_data,callback) => {
    let originalRef = job_data.imageListStoreRef;
    let imageList = job_data.imageListStoreRef
    // We create a new list of only strings so backend knows how many images are being created
    imageList = imageList.map(imageObj => {
      return imageObj['data_url'].replace(/[^A-Z0-9]/ig, "_").slice(0,30);
    }) 
    job_data.images= imageList
    job_data.imageListStoreRef1 = job_data.imageListStoreRef
    job_data.imageListStoreRef = ''
    job_data['clientId'] = localStorage.getItem('user_id')
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    axios.post('booktrades_api/unassigned_job/create_job', job_data).then(res => {
      if (originalRef.length > 0){
        const files = {'file': originalRef[0]['file']}
        let data = new FormData();
        for (var k in res['data'][0]['fields']) {
          data.append(k, res['data'][0]['fields'][k]);
        }
        data.append('file', originalRef[0]['file'], originalRef[0]['file'].name);
        delete axios.defaults.headers.common['Authorization'];
        axios.post(
            res['data'][0]['url'], 
            data, 
            {
              headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              }
            }).then(res => {
              axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
              callback(res.data)
          }).catch(err => {
            console.log(err)
          });}
        else{
          callback(res.data)
        }
      console.log('job was successfully posted!');
 
    }).catch(err => console.log(err))
    job_data.imageListStoreRef = job_data.imageListStoreRef1

  },

  uploadImageToBucket: (job_data,response) => {
    // debugger;
    // files = {'file': ('../testimage.jpg', f)}
    // file axios.post('booktrades_api/unassinged_job/create_job', job_data)
  },
//this is used for postingPage Headers aswell
  getUnassignedJobs: (contractor_id) =>{
    var contractorID = {...contractor_id}
    contractorID['id']= localStorage.getItem('contractor_id')
    contractorID['radius']=20000;
    // contractorID['services']=["idk"];
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/unassigned_job/get_nearby_jobs/'+ contractorID['id'] + '/', contractorID)
  },

  unassignedJob: (contractorID) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/unassigned_job/'+ contractorID['id'] + '/', contractorID)
  },

  getContractorProfiles: (profileID) => {
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/contractor/' + profileID['id'] + '/', profileID)
  },
  getClientProfiles: (profileID) => {
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/client/' + profileID['id'] + '/', profileID)
  },

  getProfiles: (profileId) => {
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    if (localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor'){
      return axios.get('booktrades_api/contractor/' + profileId['id'] + '/', profileId)
    }
    else{
      return axios.get('booktrades_api/client/' + profileId['id'] + '/', profileId)
    }
  },

  editProfileForBookmark: (profileId) => {
    profileId['id']= localStorage.getItem('user_id')
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    if (localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor'){
      return axios.patch('booktrades_api/contractor/' + profileId['id'] + '/', profileId)
    }
    else{
      return axios.patch('booktrades_api/client/' + profileId['id'] + '/', profileId)
    }
  },

  patchEditProfile: (profileId, callback) => {
    profileId['id']= localStorage.getItem('user_id')
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    let endpoint ="";
    if (localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor'){
      endpoint = 'booktrades_api/contractor/';
    }
    else{
      endpoint = 'booktrades_api/client/';
    }
    let image = profileId['image'];
    profileId['image'] = null
    let video = profileId['video'];
    profileId['video'] = null
    // let totalSize = 
    axios.patch(endpoint + profileId['id'] + '/', profileId).then(res => {
      let totalSize = 1
      if (video){
        totalSize += video.size
      }
      if (image){
        totalSize += image.size
      }
      if (typeof image !== "undefined" && image != null){
        let data = new FormData();
        for (var k in res['data']['profile_upload_url']['fields']) {
          data.append(k, res['data']['profile_upload_url']['fields'][k]);
        }
        data.append('file', image, image.name);
        delete axios.defaults.headers.common['Authorization'];
        axios.post(
            res['data']['profile_upload_url']['url'], 
            data, 
            {
              headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              },
              onUploadProgress: data => {
                //Set the progress value to show the progress bar
                callback({
                  'type': 'PROGRESS',
                  'value': (data.loaded / totalSize)
                })
              },
            }).then(res => {
              if (typeof video == "undefined" || video == null){
                callback({
                  'type': 'SUCCESS',
                  'data': res.data
                })
              }
              axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`

          }).catch(err => {
            console.log(err)

            callback({
              'type': 'ERROR',
              'data': err
            })
          });
      }

      if (typeof video !== "undefined" && video != null){
        let data = new FormData();
        for (var k in res['data']['profile_video_upload_url']['fields']) {
          data.append(k, res['data']['profile_video_upload_url']['fields'][k]);
        }
        data.append('file', video, video.name);
        delete axios.defaults.headers.common['Authorization'];
        axios.post(
            res['data']['profile_video_upload_url']['url'], 
            data, 
            {
              headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              },
              onUploadProgress: data => {
                //Set the progress value to show the progress bar
                callback({
                  'type': 'PROGRESS',
                  'value': (data.loaded / totalSize)
                })
              },
            }).then(res => {
              axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
              callback({
                'type': 'SUCCESS',
                'data': res.data
              })
          }).catch(err => {
            console.log(err)
            callback({
              'type': 'ERROR',
              'data': err
            })
          });
      }

      if ((typeof video == "undefined" || video == null) && (typeof image == "undefined" || image == null) ){
        callback({
          'type': 'SUCCESS',
          'data': res.data
        })
      }
      console.log('job was successfully posted!');
    }).catch(err => {
      console.log(err)
      callback({
        'type': 'ERROR',
        'data': err
      })
    })
    
  },

  getNearByCProfiles: (filterBy, radius=150) => {
    // backend will use the default values and geoip if data not provided, update this to send from view
    console.log("api", filterBy);
    if (!filterBy){
      filterBy = {};
    }
    // filterBy['long'] = 20;
    // filterBy['lat'] = 20;
    filterBy['radius']=radius;
    // filterBy['services']=["idk"];
    // axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/contractor/get_nearby_contractors/', filterBy)

  },

  getClientReview: () =>{
    var postingID = {}
    postingID['id'] =0;
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/client_review/client/'+ postingID['id'] + '/' , postingID)
  },

  addContractorReview: (review_data) => {
    review_data.clientId = localStorage.getItem('user_id');
    // review_data.contractorId = '0'
    // review_data.completedJobId = '1'
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/contractor_review/add_review', review_data)
  },

  getContractorReview: (profileId) =>{

    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/contractor_review/contractor/'+ profileId['id'])
  },
  getUserType: (profileId) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/user/' + profileId['id'] + '/')
  },
  
  getActiveJobs: (homeOId) =>{
    var homeOId = {}
    homeOId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/active_job/client/'+ homeOId['id'] + '/')
  },
  getCActiveJobs: (contractorId) =>{
    var contractorId = {}
    contractorId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/active_job/contractor/'+ contractorId['id']+'/')
  },

  getSingleActiveJob: (jobId) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/active_job/'+ jobId['id']+'/')
  },

  deleteSingleActiveJob: (data) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.delete('booktrades_api/active_job/'+ data['id']+'/')
  },

  getCompletedJobs: (homeOId) =>{
    var homeOId = {}
    homeOId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/completed_job/client/'+ homeOId['id'] + '/')
  },
  getCCompletedJobs: (contractorId) =>{
    var contractorId = {}
    contractorId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/completed_job/contractor/'+ contractorId['id']+'/')
  },
  getCCompletedJobsByClients: (contractorId) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/completed_job/contractor/'+ contractorId['id']+'/')
  },

  getSingleCompletedJob: (jobId) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/completed_job/'+ jobId['id']+'/')
  },
  deleteSingleCompletedJob: (data) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.delete('booktrades_api/completed_job/'+ data['id']+'/')
  },

  moveActiveToComplete: (jobId) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/active_job/complete/'+ jobId["id"] +'/')
  },
  changePassword: (data) =>{
    data.username= localStorage.getItem('user_name');
    // data.id_token= localStorage.getItem('access-token');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/change_password/', data)
  },
  getSavedJobs: (userId) =>{
    var userId = {}
    userId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/get_savedJobs/'+ userId["id"] +'/')
  },
  getPendingJobs: (userId) =>{
    var userId = {}
    userId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    if (localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor'){
      return axios.get('booktrades_api/contractor/get_pending_jobs/'+ userId["id"] +'/')    }
    else{
      return axios.get('booktrades_api/client/get_pending_jobs/'+ userId["id"]+ '/')    }
  },
    
  assignUnassignedJobs: (userId) =>{
    // userId["clientId"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/unassigned_job/assign_job/'+ userId["id"] +'/'+ userId['contractorId'], userId)
  },
  accepUnassignedJobs: (userId) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/unassigned_job/contractor/accept/'+ userId["id"] +'/', userId)
  },
  rejectUnassignedJobs: (userId) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/unassigned_job/contractor/reject/'+ userId["id"] +'/', userId)
  },
  getAllUnassignedJobs: (userId) =>{
    userId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/unassigned_job/get_all_unassigned_jobs/'+ userId["id"] +'/', userId)
  },
  deleteJob: (data) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.delete('booktrades_api/unassigned_job/delete_job/'+ data["id"] +'/', data)
  },
  editJob: (data) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.patch('booktrades_api/unassigned_job/'+ data["id"] +'/', data)
  },
  deleteReview: (data) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.delete('booktrades_api/contractor_review/delete_review/'+ data["id"], data)
  },
  getNotification: (userId) =>{
    var userId = {}
    userId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.get('booktrades_api/notifications/'+ localStorage.getItem('usertype').toLowerCase() + '/' + userId["id"] + '/')
  },
  patchNotification: (notification) =>{
    var userId = {}
    userId["id"] = localStorage.getItem('user_id');
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.patch('booktrades_api/notifications/'+ localStorage.getItem('usertype').toLowerCase() + '/' + userId["id"] + '/', notification)
  },
  getPdf: (data) =>{
    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access-token')}`
    return axios.post('booktrades_api/invoice/'+ data["id"] +'/', data.tempList)
  },
}
