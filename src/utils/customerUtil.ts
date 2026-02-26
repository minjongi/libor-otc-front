import axiosInstance from '@/libs/axiosInstance'

export const regInquiry = (inquiry: {
  name: string;
  title: string;
  content: string;
}) => {
    if (typeof window === 'undefined') {
        return false;
    }

    axiosInstance
        .post('/support/inquiry', {
          name: inquiry.name,
          title: inquiry.title,
          content: inquiry.content,
        })
        .then(() => {
            location.replace('/inquiry');
            alert('문의가 정상적으로 등록되었습니다.')
        })
        .catch((e) => {
            console.log(e);
            alert('오류가 발생 하였습니다.\n잠시후 다시 이용해 주세요.');
        })
}

export const inquiryList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/inquiry/list?page=' + page + '&limit=' + limit)

  return response.data
}

export const inquiryDetail = async (id: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const response = await axiosInstance.get('/support/inquiry/detail?id=' + id);
    return response.data;

  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      alert('권한이 없습니다.');
      location.replace('/inquiry')
      return false;
    }

    alert('알 수 없는 오류가 발생했습니다.')
    return false;
  }
}

export const inquiryStatus = (status: number) => {
  switch (status) {
    case 2:
      return '<b class="status-fc-cancel">거절</b>'
    case 3:
      return '<b class="status-fc-success">완료</b>'
  }

  return '<b class="status-fc-wait">대기</b>'
}

export const regContact = (values: {
  name: string;
  email: string;
  title: string;
  content: string;
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  axiosInstance
      .post('/support/contact', {
        name: values.name,
        email:values.email,
        title: values.title,
        content: values.content,
      })
      .then(() => {
        location.replace('/contact');
        alert('문의가 성공적으로 접수되었습니다.')
      })
      .catch((e) => {
        console.log(e);
        alert('오류가 발생 하였습니다.\n잠시후 다시 이용해 주세요.');
      })
}

export const assetsList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/assets/list?page=' + page + '&limit=' + limit)

  return response.data
}

export const noticeList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/notice/list?page=' + page + '&limit=' + limit)

  return response.data
}

export const noticeDetail = async (id: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/notice/detail?id=' + id)

  return response.data
}

export const apiBuyPrice = async (params: any) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/trade/buy/price?amount=' + params)

  return response.data
}

export const tradeBuyList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/trade/buy/list?page=' + page + '&limit=' + limit)

  return response.data
}

export const tradeSellList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/trade/sell/list?page=' + page + '&limit=' + limit)

  return response.data
}


export const cryptoBuyMatchingList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/trade/buy/matching/list?page=' + page + '&limit=' + limit)

  return response.data
}

export const cryptoSellMatchingList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/trade/sell/matching/list?page=' + page + '&limit=' + limit)

  return response.data
}
export const cryptoBuyFinishedList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/trade/buy/finished/list?page=' + page + '&limit=' + limit)

  return response.data
}

export const cryptoSellFinishedList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/trade/sell/finished/list?page=' + page + '&limit=' + limit)

  return response.data
}
//
// export const getBuyUserDetail = async (userId: any) => {
//   if (typeof window === 'undefined') {
//     return false;
//   }
//
//   const response = await axiosInstance.get('/transaction/buy/user/detail', { userId })
//
//   return response.data;
// }
//
// export const getSellUserDetail = async (userId: any) => {
//   if (typeof window === 'undefined') {
//     return false;
//   }
//
//   const response = await axiosInstance.get('/transaction/sell/user/detail', { userId })
//
//   return response.data;
// }

export const messageList = async (page: number, limit: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/message/list?page=' + page + '&limit=' + limit)

  return response.data
}

export const messageDetail = async (id: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  // /support/message/detail?id=164

  const response = await axiosInstance.get('/support/message/detail?id=' + id)

  return response.data
}

export const customerInfo = async () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/support/info')

  return response.data
}

export const isRead = (status: number) => {
  switch (status) {
    case 2:
      return '<b class="status-fc-success">확인</b>'
  }

  return '<b class="status-fc-wait">미확인</b>'
}