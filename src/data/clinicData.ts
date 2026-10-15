import { ServiceItem, ReviewTheme, FaqItem } from '../types';

export const CLINIC_INFO = {
  doctorNameEn: 'Dr. Sneha Bakshi',
  doctorNameHi: 'डॉ. स्नेहा बख्शी',
  qualification: 'MBBS',
  specializationEn: 'General Physician',
  specializationHi: 'जनरल फिजिशियन',
  roleEn: 'Visiting Consultant at Nu Med Hospital',
  roleHi: 'न्यू मेड अस्पताल में विजिटिंग कंसल्टेंट',
  rating: 4.8,
  reviewCount: 745,
  address: 'Kalyan Pharmacy, Supertech Eco Village-2, Greater Noida West Road, Eco Village 2, Noida, Ghaziabad, Uttar Pradesh 201318',
  addressHi: 'कल्याण फार्मेसी, सुपरटेक इको विलेज-2, ग्रेटर नोएडा वेस्ट रोड, इको विलेज 2, नोएडा, गाजियाबाद, उत्तर प्रदेश 201318',
  phoneDisplay: '+91 76663 46391',
  phoneTel: '+917666346391',
  plusCode: 'JC6R+5M, Noida, Uttar Pradesh',
  closingTime: '8:30 PM',
  closingTimeHi: 'रात 8:30 बजे तक',
  languagesSpoken: ['English', 'हिंदी (Hindi)'],
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Kalyan+Pharmacy+Supertech+Eco+Village-2+Greater+Noida+West+Road+Noida+201318',
  mapsEmbedQuery: 'Kalyan Pharmacy, Supertech Eco Village-2, Greater Noida West Road, Noida, Uttar Pradesh 201318',
  googleReviewSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+Sneha+Bakshi+MBBS+Supertech+Eco+Village+2+Noida',
  whatsappMessage: 'Hello, I would like to enquire about an appointment with Dr. Sneha Bakshi (MBBS). Please share the available appointment times.',
  getWhatsappUrl: (customMsg?: string) => {
    const text = customMsg || 'Hello, I would like to enquire about an appointment with Dr. Sneha Bakshi (MBBS). Please share the available appointment times.';
    return `https://wa.me/917666346391?text=${encodeURIComponent(text)}`;
  }
};

export const MEDICAL_SERVICES: ServiceItem[] = [
  {
    id: 'general-consultations',
    titleEn: 'General Health Consultations',
    titleHi: 'सामान्य स्वास्थ्य परामर्श',
    descEn: 'Comprehensive evaluation of daily health concerns, acute complaints, fatigue, and primary medical guidance.',
    descHi: 'दैनिक स्वास्थ्य समस्याओं, तीव्र लक्षणों, थकान एवं प्राथमिक चिकित्सीय मार्गदर्शन का संपूर्ण मूल्यांकन।',
    iconName: 'Stethoscope'
  },
  {
    id: 'fever-illness',
    titleEn: 'Fever & Common Illness Assessment',
    titleHi: 'बुखार एवं मौसमी बीमारियों की जांच',
    descEn: 'Systematic diagnosis and management of seasonal fevers, viral infections, cough, cold, and flu-like illnesses.',
    descHi: 'मौसमी बुखार, वायरल संक्रमण, खांसी, जुकाम और फ्लू जैसे सामान्य विकारों का समय पर परीक्षण एवं उपचार।',
    iconName: 'Thermometer'
  },
  {
    id: 'check-ups',
    titleEn: 'General Medical Check-ups',
    titleHi: 'नियमित स्वास्थ्य परीक्षण',
    descEn: 'Routine baseline physical examinations and screening to help identify potential health risks early.',
    descHi: 'संभावित स्वास्थ्य जोखिमों की समय रहते पहचान हेतु नियमित शारीरिक जांच व बुनियादी स्वास्थ्य स्क्रीनिंग।',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'preventive-care',
    titleEn: 'Preventive Healthcare Guidance',
    titleHi: 'निवारक स्वास्थ्य देख-रेख',
    descEn: 'Practical strategies for disease prevention, balanced nutrition advice, and maintaining immune resilience.',
    descHi: 'रोगों से बचाव, संतुलित पोषण मार्गदर्शन एवं प्रतिरक्षा सुदृढ़ रखने हेतु व्यावहारिक चिकित्सीय सलाह।',
    iconName: 'ShieldAlert'
  },
  {
    id: 'bp-monitoring',
    titleEn: 'Blood Pressure & Health Monitoring',
    titleHi: 'रक्तचाप एवं स्वास्थ्य निगरानी',
    descEn: 'Clinical monitoring of blood pressure, heart rate, vitals, and long-term health tracking.',
    descHi: 'रक्तचाप (BP), पल्स और शारीरिक महत्वपूर्ण संकेतों (Vitals) की नियमित क्लिनिकल जांच एवं निगरानी।',
    iconName: 'Activity'
  },
  {
    id: 'follow-up',
    titleEn: 'Follow-up Consultations',
    titleHi: 'फॉलो-अप परामर्श',
    descEn: 'Ongoing progress review of previously treated illnesses to ensure full recovery and medication compliance.',
    descHi: 'पूर्व परामर्श एवं उपचार के बाद स्वास्थ्य सुधार की निरंतर समीक्षा व दवाओं के उचित सेवन की जांच।',
    iconName: 'Clock'
  },
  {
    id: 'lifestyle-wellness',
    titleEn: 'Lifestyle & General Wellness Guidance',
    titleHi: 'जीवनशैली एवं स्वास्थ्य परामर्श',
    descEn: 'Evidence-informed counsel on sleep hygiene, stress reduction, physical activity, and healthy habits.',
    descHi: 'नींद की स्वच्छता, तनाव नियंत्रण, दैनिक व्यायाम और स्वस्थ जीवनशैली अपनाने हेतु तथ्याधारित मार्गदर्शन।',
    iconName: 'HeartPulse'
  },
  {
    id: 'referral-guidance',
    titleEn: 'Referral Guidance When Specialist Needed',
    titleHi: 'विशेषज्ञ रेफरल मार्गदर्शन',
    descEn: 'Clinical triage and informed referrals to secondary or tertiary medical specialists whenever required.',
    descHi: 'जटिल लक्षणों की स्थिति में सही द्वितीयक या तृतीयक सुपर-स्पेशलिस्ट डॉक्टर के पास समय पर रेफरल सहायता।',
    iconName: 'Users'
  }
];

export const REVIEW_THEMES: ReviewTheme[] = [
  {
    titleEn: 'Attentive Patient Listening',
    titleHi: 'मरीजों की बात धैर्यपूर्वक सुनना',
    descEn: 'Patients frequently appreciate Dr. Sneha Bakshi taking sufficient time to hear symptoms thoroughly without rushing.',
    descHi: 'मरीज अक्सर सराहना करते हैं कि डॉ. स्नेहा बख्शी बिना किसी जल्दबाजी के सभी लक्षणों को ध्यान से सुनती हैं।',
    highlightTag: 'Care & Empathy'
  },
  {
    titleEn: 'Clear Clinical Explanations',
    titleHi: 'उपचार व बीमारी की सरल समझ',
    descEn: 'Transparent discussion about diagnostic findings, prescribed medications, and practical precautions for home recovery.',
    descHi: 'रोग के कारणों, दवाओं के प्रभाव और घर पर बरती जाने वाली सावधानियों के बारे में स्पष्ट जानकारी।',
    highlightTag: 'Clarity'
  },
  {
    titleEn: 'Polite & Reassuring Communication',
    titleHi: 'सभ्य व विनम्र बातचीत',
    descEn: 'Warm bedside manner that helps put anxious patients and family members at ease during consultations.',
    descHi: 'सहज और विनम्र व्यवहार जो परामर्श के दौरान मरीज और उनके परिजनों की चिंता को कम करने में मदद करता है।',
    highlightTag: 'Bedside Manner'
  },
  {
    titleEn: 'Comfortable Consultation Experience',
    titleHi: 'सुगम व सहज क्लिनिक अनुभव',
    descEn: 'Clean, supportive environment at Kalyan Pharmacy clinic in Supertech Eco Village-2 for neighborhood families.',
    descHi: 'सुपरटेक इको विलेज-2 में स्थित क्लिनिक में स्थानीय परिवारों के लिए स्वच्छ, शांत और सुविधाजनक माहौल।',
    highlightTag: 'Patient Comfort'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    questionEn: 'How can I request an appointment with Dr. Sneha Bakshi?',
    questionHi: 'डॉ. स्नेहा बख्शी से परामर्श के लिए अपॉइंटमेंट का अनुरोध कैसे करें?',
    answerEn: 'You can submit an appointment request using the online form on this website, or call the clinic directly at +91 76663 46391, or send an enquiry via WhatsApp. Please note that online submissions are subject to confirmation by the clinic staff.',
    answerHi: 'आप इस वेबसाइट पर दिए गए ऑनलाइन फॉर्म के जरिए अपॉइंटमेंट का अनुरोध कर सकते हैं, या सीधे क्लिनिक के नंबर +91 76663 46391 पर कॉल कर सकते हैं, अथवा व्हाट्सएप से संदेश भेज सकते हैं। कृपया ध्यान दें कि ऑनलाइन अनुरोध की पुष्टि क्लिनिक द्वारा की जाती है।'
  },
  {
    id: 'faq-2',
    questionEn: 'Where is the clinic located?',
    questionHi: 'क्लिनिक कहाँ स्थित है?',
    answerEn: 'The clinic is located at Kalyan Pharmacy, Supertech Eco Village-2, Greater Noida West Road, Eco Village 2, Noida, Ghaziabad, Uttar Pradesh 201318. The Google Plus Code is JC6R+5M, Noida.',
    answerHi: 'क्लिनिक कल्याण फार्मेसी, सुपरटेक इको विलेज-2, ग्रेटर नोएडा वेस्ट रोड, इको विलेज 2, नोएडा, गाजियाबाद, उत्तर प्रदेश 201318 पर स्थित है। इसका गूगल प्लस कोड JC6R+5M, नोएडा है।'
  },
  {
    id: 'faq-3',
    questionEn: 'How can I contact the clinic?',
    questionHi: 'क्लिनिक से कैसे संपर्क कर सकते हैं?',
    answerEn: 'You can call the clinic directly at +91 76663 46391 during operational hours, or message via WhatsApp for general appointment enquiries.',
    answerHi: 'आप क्लिनिक के समय के दौरान +91 76663 46391 पर कॉल कर सकते हैं, अथवा सामान्य अपॉइंटमेंट पूछताछ के लिए व्हाट्सएप पर संपर्क कर सकते हैं।'
  },
  {
    id: 'faq-4',
    questionEn: 'Is Dr. Sneha Bakshi associated with Nu Med Hospital?',
    questionHi: 'क्या डॉ. स्नेहा बख्शी न्यू मेड अस्पताल से जुड़ी हैं?',
    answerEn: 'Yes, Dr. Sneha Bakshi (MBBS) is a Visiting Consultant at Nu Med Hospital. Her outpatient clinic consultations are conducted at Kalyan Pharmacy, Supertech Eco Village-2, Noida.',
    answerHi: 'हाँ, डॉ. स्नेहा बख्शी (एमबीबीएस) न्यू मेड अस्पताल में विजिटिंग कंसल्टेंट हैं। उनका ओपीडी क्लिनिक परामर्श कल्याण फार्मेसी, सुपरटेक इको विलेज-2, नोएडा में उपलब्ध होता है।'
  },
  {
    id: 'faq-5',
    questionEn: 'What should I bring to my consultation?',
    questionHi: 'परामर्श के लिए आते समय क्या साथ लाना चाहिए?',
    answerEn: 'Please bring any previous medical records, recent laboratory blood test reports, an active list of your current medicines, and a valid photo identification.',
    answerHi: 'कृपया अपने पिछले मेडिकल पर्चे, हालिया लैब जांच रिपोर्ट्स, वर्तमान में चल रही दवाओं की सूची और एक वैध पहचान पत्र साथ लेकर आएं।'
  },
  {
    id: 'faq-6',
    questionEn: 'How can I check appointment availability?',
    answerEn: 'For the most accurate real-time appointment availability and token status, please call the clinic directly at +91 76663 46391 before your visit.',
    questionHi: 'अपॉइंटमेंट की उपलब्धता की जानकारी कैसे प्राप्त करें?',
    answerHi: 'अपॉइंटमेंट की ताज़ा उपलब्धता और टोकन की सही स्थिति जानने के लिए आने से पहले क्लिनिक के नंबर +91 76663 46391 पर सीधे कॉल करने की सलाह दी जाती है।'
  },
  {
    id: 'faq-7',
    questionEn: 'What should I do in a medical emergency?',
    questionHi: 'आपातकालीन चिकित्सीय स्थिति (Medical Emergency) में क्या करें?',
    answerEn: 'This website and the appointment request form are strictly for non-emergency general physician consultations. In case of acute chest pain, severe shortness of breath, sudden weakness, heavy trauma, or any life-threatening emergency, please dial 108 or 112 immediately, or go straight to the nearest 24/7 hospital emergency department.',
    answerHi: 'यह वेबसाइट और अपॉइंटमेंट फॉर्म केवल गैर-आपातकालीन सामान्य परामर्श के लिए हैं। सीने में गंभीर दर्द, सांस लेने में अत्यधिक कठिनाई, बेहोशी या किसी भी गंभीर आपात स्थिति में तुरंत 108 या 112 डायल करें, या निकटतम 24/7 अस्पताल के इमरजेंसी वार्ड में जाएं।'
  }
];
