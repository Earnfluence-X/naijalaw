import { RightGuide } from '@/types';

export const rightsGuides: RightGuide[] = [
  {
    id: 'r1',
    title: 'When Stopped by Police',
    category: 'Police Encounters',
    description: 'Your constitutional rights when you are stopped, questioned, or arrested by the Nigerian Police Force.',
    relevantSections: ['s33', 's34', 's35', 's36', 's37', 's41'],
    scenarios: [
      {
        situation: 'Police stop you at a checkpoint and demand to search your phone.',
        yourRights: 'Section 37 guarantees your right to privacy of correspondence and communications. Police cannot search your phone without a court order or your voluntary consent.',
        whatToDo: 'Politely ask if they have a court order. You are not required to unlock your phone. Remain calm and respectful. Note the officer\'s name and station.',
        relevantLaw: 'Section 37 - Right to Private and Family Life; Administration of Criminal Justice Act 2015',
      },
      {
        situation: 'You are arrested and taken to a police station.',
        yourRights: 'Section 35(2) gives you the right to remain silent. Section 35(3) requires the police to inform you in writing within 24 hours of the reasons for your arrest in a language you understand. Section 35(4) requires that you be brought before a court within a reasonable time.',
        whatToDo: 'Remain calm. Exercise your right to silence. Demand to see a lawyer before answering any questions. Insist on being informed of the charges against you in writing. Do not sign any statement without your lawyer present.',
        relevantLaw: 'Section 35 - Right to Personal Liberty; Administration of Criminal Justice Act 2015, Sections 6-8',
      },
      {
        situation: 'Police demand a bribe to release you or let you pass.',
        yourRights: 'Bribery is a criminal offence. Section 15(5) of the Constitution mandates the abolition of corrupt practices. The ICPC Act and EFCC Act criminalize bribery.',
        whatToDo: 'Do not pay the bribe. Note the officer\'s name, rank, and station number. Report the incident to the Police Service Commission, ICPC, or the police complaints unit. Document everything you can safely.',
        relevantLaw: 'Section 15(5) - Political Objectives (anti-corruption); Corrupt Practices and Other Related Offences Act 2000',
      },
    ],
    icon: 'shield',
  },
  {
    id: 'r2',
    title: 'Freedom of Expression and Protest',
    category: 'Civil Liberties',
    description: 'Your rights to speak, write, protest, and organize as guaranteed by the Nigerian Constitution.',
    relevantSections: ['s39', 's40', 's45'],
    scenarios: [
      {
        situation: 'You want to organize a peaceful protest against government policy.',
        yourRights: 'Section 39 guarantees freedom of expression. Section 40 guarantees the right to peaceful assembly and association. These are fundamental rights protected by the Constitution.',
        whatToDo: 'You have the right to peaceful protest without needing police permission (though notification is advisable). Ensure the protest remains peaceful. Document everything. Have legal support on standby. Do not carry weapons.',
        relevantLaw: 'Sections 39 and 40 - Freedom of Expression and Peaceful Assembly; Public Order Act (note: the Supreme Court has ruled that police permits are not required for peaceful assembly)',
      },
      {
        situation: 'You post criticism of a government official on social media and are threatened with arrest.',
        yourRights: 'Section 39(1) protects your right to hold opinions and to receive and impart ideas and information without interference. Criticism of public officials is protected speech in a democracy.',
        whatToDo: 'Ensure your statements are factual or clearly opinion. Save evidence of any threats. Contact a human rights lawyer. Report threats to civil liberties organizations. The Cybercrimes Act should not be used to suppress legitimate speech.',
        relevantLaw: 'Section 39 - Freedom of Expression; African Charter on Human and Peoples\' Rights (ratified by Nigeria)',
      },
    ],
    icon: 'megaphone',
  },
  {
    id: 'r3',
    title: 'Right to Fair Trial',
    category: 'Justice System',
    description: 'Understanding your rights when facing criminal charges or civil proceedings in Nigerian courts.',
    relevantSections: ['s36', 's46'],
    scenarios: [
      {
        situation: 'You are charged with a criminal offence and cannot afford a lawyer.',
        yourRights: 'Section 36(6)(d) gives you the right to defend yourself in person or by a legal practitioner of your choice. The court must assign you a lawyer if you cannot afford one for the purpose of your defence.',
        whatToDo: 'Inform the court that you cannot afford a lawyer and request one be assigned to you. Contact the Legal Aid Council of Nigeria. Many NGOs and law clinics offer free legal services.',
        relevantLaw: 'Section 36(6)(d) - Right to Fair Hearing; Legal Aid Act 2011',
      },
      {
        situation: 'You have been detained for over 2 months without trial.',
        yourRights: 'Section 35(4) provides that if you are not tried within 2 months (if in custody) or 3 months (if on bail), you must be released unconditionally or on reasonable conditions.',
        whatToDo: 'Apply for bail through your lawyer or seek an order for your release. File a fundamental rights enforcement application under Section 46. Contact legal aid organizations. The Administration of Criminal Justice Act 2015 also protects against prolonged detention.',
        relevantLaw: 'Section 35(4) - Right to Personal Liberty; Administration of Criminal Justice Act 2015, Section 293',
      },
    ],
    icon: 'scales',
  },
  {
    id: 'r4',
    title: 'Property Rights',
    category: 'Property and Land',
    description: 'Your constitutional rights regarding property ownership, land acquisition, and protection against unlawful seizure.',
    relevantSections: ['s43', 's44'],
    scenarios: [
      {
        situation: 'The government wants to acquire your land for a public project.',
        yourRights: 'Section 44 states that your property cannot be compulsorily acquired except in accordance with law, and you must receive prompt and adequate compensation. You also have the right to challenge the compensation amount in court.',
        whatToDo: 'Demand to see the official acquisition notice and the legal basis. Engage a lawyer to review the compensation offer. You can challenge inadequate compensation in court. Document the value of your property with professional valuers.',
        relevantLaw: 'Section 44 - Compulsory Acquisition of Property; Land Use Act 1978',
      },
      {
        situation: 'You are denied the right to buy property because of your state of origin.',
        yourRights: 'Section 43 guarantees every Nigerian citizen the right to acquire and own immovable property anywhere in Nigeria. Section 42 prohibits discrimination based on place of origin.',
        whatToDo: 'Document the discriminatory conduct. File a complaint with the Federal Character Commission. Engage a lawyer to file a fundamental rights enforcement suit. Report to the National Human Rights Commission.',
        relevantLaw: 'Sections 42 and 43 - Freedom from Discrimination and Right to Property',
      },
    ],
    icon: 'home',
  },
  {
    id: 'r5',
    title: 'Religious Freedom',
    category: 'Civil Liberties',
    description: 'Your right to practice, change, or abstain from religion as protected by the Constitution.',
    relevantSections: ['s38', 's10'],
    scenarios: [
      {
        situation: 'Your child is being forced to participate in religious activities at school that conflict with your faith.',
        yourRights: 'Section 38(2) provides that no person attending any place of education shall be required to receive religious instruction or take part in religious ceremonies of a religion other than their own or one not approved by their parent/guardian.',
        whatToDo: 'Write to the school administration citing Section 38(2). If not resolved, report to the state Ministry of Education. If necessary, file a fundamental rights enforcement application. Contact religious freedom organizations for support.',
        relevantLaw: 'Section 38 - Right to Freedom of Thought, Conscience and Religion',
      },
      {
        situation: 'You are denied a government job because of your religion.',
        yourRights: 'Section 42 prohibits discrimination based on religion. Section 14(3) requires government to reflect federal character, which includes religious diversity.',
        whatToDo: 'Document the discriminatory conduct. File a complaint with the Federal Character Commission. Engage a lawyer. Report to the National Human Rights Commission.',
        relevantLaw: 'Sections 38 and 42 - Freedom of Religion and Non-Discrimination',
      },
    ],
    icon: 'book',
  },
  {
    id: 'r6',
    title: 'Women\'s Rights',
    category: 'Equality',
    description: 'Constitutional protections for women including equality, non-discrimination, and citizenship rights.',
    relevantSections: ['s42', 's17', 's26'],
    scenarios: [
      {
        situation: 'A woman is paid less than male colleagues for the same work.',
        yourRights: 'Section 17(3)(e) directs that there shall be equal pay for equal work without discrimination on account of sex. Section 42 prohibits discrimination based on sex.',
        whatToDo: 'Document the pay disparity with evidence. Report to the National Industrial Court which has jurisdiction over labour matters. File a complaint with the National Human Rights Commission. Engage a labour lawyer.',
        relevantLaw: 'Sections 17(3)(e) and 42 - Equal Pay and Non-Discrimination; Labour Act',
      },
      {
        situation: 'A woman married to a Nigerian man is denied citizenship registration.',
        yourRights: 'Section 26(2)(a) provides that any woman who is or has been married to a citizen of Nigeria may be registered as a citizen of Nigeria.',
        whatToDo: 'Apply through the Nigeria Immigration Service with marriage certificate and spouse\'s citizenship evidence. If denied, seek legal assistance. The application process requires proof of good character, intention to reside in Nigeria, and the Oath of Allegiance.',
        relevantLaw: 'Section 26 - Citizenship by Registration',
      },
    ],
    icon: 'users',
  },
  {
    id: 'r7',
    title: 'Workers\' Rights',
    category: 'Employment',
    description: 'Constitutional protections for workers including fair conditions, freedom of association, and non-discrimination.',
    relevantSections: ['s17', 's40', 's34'],
    scenarios: [
      {
        situation: 'Your employer threatens to fire you for joining a trade union.',
        yourRights: 'Section 40 guarantees the right to freely associate with others and specifically mentions the right to form or belong to trade unions for the protection of your interests.',
        whatToDo: 'Document the threat. Report to the trade union leadership. File a complaint with the National Industrial Court. Contact the Ministry of Labour. Consult a labour lawyer.',
        relevantLaw: 'Section 40 - Right to Peaceful Assembly and Association; Trade Unions Act',
      },
      {
        situation: 'You are subjected to forced overtime without pay.',
        yourRights: 'Section 34(1)(c) prohibits forced or compulsory labour. Section 17(3)(b) directs that conditions of work should be just and humane.',
        whatToDo: 'Document the forced overtime. Report to the Ministry of Labour. File a complaint with the National Industrial Court. Seek legal counsel from a labour lawyer.',
        relevantLaw: 'Sections 34 and 17 - Dignity of Person and Social Objectives; Labour Act',
      },
    ],
    icon: 'briefcase',
  },
  {
    id: 'r8',
    title: 'Digital Rights',
    category: 'Technology',
    description: 'How constitutional rights apply to the digital world, including privacy, data protection, and online expression.',
    relevantSections: ['s37', 's39', 's36'],
    scenarios: [
      {
        situation: 'The government orders social media companies to block your accounts.',
        yourRights: 'Section 39 guarantees freedom of expression including the right to receive and impart ideas and information. Section 37 protects the privacy of your communications.',
        whatToDo: 'Document the blocking. Contact digital rights organizations like Paradigm Initiative. Engage a lawyer to file a fundamental rights enforcement application. Report to the National Human Rights Commission.',
        relevantLaw: 'Sections 37 and 39 - Privacy and Freedom of Expression; Nigeria Data Protection Act 2023',
      },
      {
        situation: 'Your personal data is collected without consent by a government agency.',
        yourRights: 'Section 37 guarantees the privacy of citizens. The Nigeria Data Protection Act 2023 provides comprehensive data protection rights including consent requirements.',
        whatToDo: 'File a complaint with the Nigeria Data Protection Commission. Engage a data protection lawyer. Document all instances of unauthorized data collection.',
        relevantLaw: 'Section 37 - Right to Private and Family Life; Nigeria Data Protection Act 2023',
      },
    ],
    icon: 'wifi',
  },
];
