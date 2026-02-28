import axiosInstance from '@/libs/axiosInstance'

export const getOtcTransactionList = async (page: number, limit: number, type: string, loginUserOnly: number | string, status: number) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/otc/tx?page=' + page + '&limit=' + limit + '&type=' + type + '&loginUserOnly=' + loginUserOnly + '&status=' + status)

  return response.data
}

export const getOtcTransaction = async (id: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/otc/tx/detail?id=' + id)

  return response.data
}

export const regOtc = (values: {
  type: number;
  selectCoinValue: string;
  amount: string;
  price: string;
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/tx', {
      type: values.type,
      assetTypeId: values.selectCoinValue,
      amount: Number(values.amount.replace(',', '')),
      price: Number(values.price.replace(',', ''))
    })
}

export const cancelOtcTransaction = (otcTransactionId: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/tx/cancel', {
      otcTransactionId: otcTransactionId,
    })
}

export const getOtcTransactionMatchingList = async (page: number, limit: number, type: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/otc/tx/matching?page=' + page + '&limit=' + limit + '&type=' + type)

  return response.data
}

export const getOtcTransactionMatching = async (id: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/otc/tx/matching/' + id)

  return response.data
}

export const regOtcMatching = (values: {
  otcTransactionId: string;
  assetTypeId: string;
  assetSymbol: string;
  amount: string;
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/tx/matching', {
      otcTransactionId: values.otcTransactionId,
      assetTypeId: values.assetTypeId,
      assetSymbol: values.assetSymbol,
      amount: Number(values.amount.replace(',', '')),

    })
}

export const cancelOtcMatching = (otcTransactionMatchingId: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/tx/matching/cancel', {
      otcTransactionMatchingId: otcTransactionMatchingId,
    })
}

export const completeDepositOtcMatching = (otcTransactionMatchingId: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/tx/matching/deposit/complete', {
      otcTransactionMatchingId: otcTransactionMatchingId,
    })
}

export const confirmDepositOtcMatching = (otcTransactionMatchingId: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/tx/matching/deposit/confirm', {
      otcTransactionMatchingId: otcTransactionMatchingId,
    })
}

export const kyc: any = (data: {
  agentId: string,
  loginId: string,
  password: string,
  name: string,
  bank_name: string,
  bank_account: string,
  bank_account_name: string,
  phone_number: string,
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/kyc', {
      agentId: data.agentId || '',
      loginId: data.loginId || '',
      password: data.password || '',
      name: data.name || '',
      bank_name: data.bank_name || '',
      bank_account: data.bank_account || '',
      bank_account_name: data.bank_account_name || '',
      phone_number: data.phone_number || '',
    })
}

export const getEasyTradeInfo = async (agentId: string, userId: string, symbol: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/otc/easy-trade?agentId=' + agentId + '&userId=' + userId + '&symbol=' + symbol)

  if (response.data.status === 'agent_inactive') {
    alert('점검중 입니다');
    self.close();
    location.replace('about:blank');
  }

  if (response.data.status === 'inactive') {
    alert('잘못된 접근입니다');
    self.close();
    location.replace('about:blank');
  }

  return response.data
}

export const getEasyTradeClientUserInfo = async (agentId: string, userId: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/otc/easy-trade/client-user-info?agentId=' + agentId + '&userId=' + userId)

  return response.data
}

export const regEasyTradeInfo: any = (data: {
  agentId: string,
  userId: string,
  assetTypeId: string,
  amount: number,
  phoneNumber: string,
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/easy-trade', {
      agentId: data.agentId || '',
      userId: data.userId || '',
      assetTypeId: data.assetTypeId || '',
      amount: data.amount || 0,
      phoneNumber: data.phoneNumber || '',
    })
}

// export const getBuyTransactionDetail = async (transactionId: any) => {
//   if (typeof window === 'undefined') {
//     return false;
//   }
//
//   const response = await axiosInstance.get('/transaction/buy/detail', { transactionId })
//
//   return response.data;
// }
//
// export const cancelTransaction = async (transactionId: any) => {
//   if (typeof window === 'undefined') {
//     return false;
//   }
//
//   const response = await axiosInstance.get('/transaction/cancel', { transactionId })
//
//   return response.data;
// }
//
// export const confirmedBuyTransaction = async (transactionId: any) => {
//   if (typeof window === 'undefined') {
//     return false;
//   }
//
//   const response = await axiosInstance.get('/transaction/buy/confirm', { transactionId })
//
//   return response.data;
// }

export const bankName = (bankCode: string) => {
  const bankInfo = {
    "001": "한국은행",
    "002": "산업은행",
    "003": "기업은행",
    "004": "KB국민은행",
    "005": "외환은행",
    "006": "주택은행",
    "007": "수협은행",
    "008": "수출입은행",
    "009": "수산업협동조합",
    "010": "농업협동조합",
    "011": "NH농협은행",
    "012": "지역농축협",
    "013": "농업협동조합",
    "014": "농업협동조합",
    "015": "농업협동조합",
    "016": "축산업협동조합",
    "017": "축산업협동조합",
    "019": "국민은행",
    "020": "우리은행",
    "021": "신한은행",
    "022": "상업은행",
    "023": "SC제일은행",
    "024": "한일은행",
    "025": "서울은행",
    "026": "신한은행",
    "027": "한국씨티은행",
    "028": "동화은행",
    "029": "동남은행",
    "030": "수협중앙회",
    "031": "대구은행",
    "032": "부산은행",
    "033": "충청은행",
    "034": "광주은행",
    "035": "제주은행",
    "036": "경기은행",
    "037": "전북은행",
    "038": "강원은행",
    "039": "경남은행",
    "040": "충북은행",
    "041": "우리카드",
    "042": "국민카드",
    "043": "장기신용카드사",
    "044": "외환카드",
    "045": "새마을금고",
    "046": "새마을금고",
    "048": "신협",
    "049": "신용협동조합",
    "050": "저축은행",
    "051": "외국은행",
    "052": "모건스탠리은행",
    "053": "시티은행",
    "054": "HSBC은행",
    "055": "도이치은행",
    "056": "알비에스은행",
    "057": "JP모간체이스은행",
    "058": "미즈호은행",
    "059": "MUFG은행",
    "060": "BOA은행",
    "061": "비엔피파리바은행",
    "062": "중국공상은행",
    "063": "중국은행",
    "064": "산림조합중앙회",
    "065": "대화은행",
    "066": "교통은행",
    "067": "중국건설은행",
    "071": "우체국",
    "072": "우체국",
    "073": "우체국",
    "074": "우체국",
    "075": "우체국",
    "076": "신용보증기금",
    "081": "하나은행",
    "082": "보람은행",
    "083": "평화은행",
    "084": "우리은행",
    "088": "신한은행",
    "089": "케이뱅크",
    "090": "카카오뱅크",
    "091": "한네트",
    "092": "토스뱅크",
    "093": "청호이지캐쉬",
    "094": "훼미리뱅크",
    "095": "롯데피에스넷",
    "096": "한국신용정보",
    "099": "금융결제원",
    "101": "한국신용정보원",
    "102": "대신저축은행",
    "103": "SBI저축은행",
    "104": "HK저축은행",
    "105": "웰컴저축은행",
    "106": "신한저축은행",
    "209": "동양종합금융증권",
    "218": "현대증권",
    "230": "미래에셋증권",
    "238": "대우증권",
    "240": "삼성증권",
    "243": "한국투자증권",
    "247": "우리투자증권",
    "261": "교보증권",
    "262": "하이투자증권",
    "263": "에이치엠씨투자증권",
    "265": "이트레이트증권",
    "266": "에스케이증권",
    "267": "대신증권",
    "268": "솔로몬투자증권",
    "269": "한화증권",
    "270": "하나대투증권",
    "278": "신한금융투자",
    "279": "동부증권",
    "280": "유진투자증권",
    "287": "메리츠종합금융증권",
    "289": "NH투자증권",
    "290": "부국증권",
    "291": "신영증권",
  }

  // @ts-ignore
  return bankInfo[bankCode] || bankCode;
}

export const getUserAssetInfo = async () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = await axiosInstance.get('/otc/asset-info')

  return response.data
}

export const sendAuthCode = (data: {
  type: number,
  agentId: string,
  userId: string,
  phoneNumber: string,
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/sms-auth', {
      type: data.type || 1,
      agentId: data.agentId || '',
      userId: data.userId || '',
      phoneNumber: data.phoneNumber || '',
    })
}

export const confirmAuthCode = (data: {
  type: number,
  agentId: string,
  userId: string,
  code: string,
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/otc/sms-auth-confirm', {
      type: data.type || 1,
      agentId: data.agentId || '',
      userId: data.userId || '',
      code: data.code || '',
    })
}