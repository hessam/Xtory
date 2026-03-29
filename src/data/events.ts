export type StatusInRegion = 'Direct Control' | 'Vassal State' | 'Contested/Warzone' | 'Sphere of Influence';

export interface ReignEvent {
  id: string;
  rulerId: string;
  regionId: string;
  startDate: number;
  endDate: number;
  status: StatusInRegion;
}

export const events: ReignEvent[] = [
  // Cyrus the Great
  { id: 'e1', rulerId: 'cyrus_great', regionId: 'fars', startDate: -559, endDate: -530, status: 'Direct Control' },
  { id: 'e2', rulerId: 'cyrus_great', regionId: 'jibal', startDate: -550, endDate: -530, status: 'Direct Control' },
  { id: 'e3', rulerId: 'cyrus_great', regionId: 'mesopotamia', startDate: -539, endDate: -530, status: 'Direct Control' },
  { id: 'e4', rulerId: 'cyrus_great', regionId: 'anatolia', startDate: -547, endDate: -530, status: 'Direct Control' },
  { id: 'e5', rulerId: 'cyrus_great', regionId: 'khorasan', startDate: -540, endDate: -530, status: 'Direct Control' },
  { id: 'e235', rulerId: 'cyrus_great', regionId: 'tabaristan', startDate: -540, endDate: -530, status: 'Direct Control' },
  
  // Seleucus I
  { id: 'e6', rulerId: 'seleucus_i', regionId: 'mesopotamia', startDate: -305, endDate: -281, status: 'Direct Control' },
  { id: 'e7', rulerId: 'seleucus_i', regionId: 'fars', startDate: -305, endDate: -281, status: 'Direct Control' },
  { id: 'e8', rulerId: 'seleucus_i', regionId: 'jibal', startDate: -305, endDate: -281, status: 'Direct Control' },
  
  // Mithridates I
  { id: 'e9', rulerId: 'mithridates_i', regionId: 'khorasan', startDate: -171, endDate: -132, status: 'Direct Control' },
  { id: 'e10', rulerId: 'mithridates_i', regionId: 'jibal', startDate: -148, endDate: -132, status: 'Direct Control' },
  { id: 'e11', rulerId: 'mithridates_i', regionId: 'mesopotamia', startDate: -141, endDate: -132, status: 'Direct Control' },
  
  // Khosrow II
  { id: 'e12', rulerId: 'khosrow_ii', regionId: 'mesopotamia', startDate: 590, endDate: 628, status: 'Direct Control' },
  { id: 'e13', rulerId: 'khosrow_ii', regionId: 'fars', startDate: 590, endDate: 628, status: 'Direct Control' },
  { id: 'e14', rulerId: 'khosrow_ii', regionId: 'jibal', startDate: 590, endDate: 628, status: 'Direct Control' },
  { id: 'e15', rulerId: 'khosrow_ii', regionId: 'khorasan', startDate: 590, endDate: 628, status: 'Direct Control' },
  { id: 'e16', rulerId: 'khosrow_ii', regionId: 'caucasus', startDate: 590, endDate: 628, status: 'Direct Control' },
  
  // Bahram Chobin (Rival)
  { id: 'e17', rulerId: 'bahram_chobin', regionId: 'jibal', startDate: 590, endDate: 591, status: 'Contested/Warzone' },
  { id: 'e18', rulerId: 'bahram_chobin', regionId: 'mesopotamia', startDate: 590, endDate: 591, status: 'Contested/Warzone' },
  
  // Harun al-Rashid
  { id: 'e19', rulerId: 'harun_al_rashid', regionId: 'mesopotamia', startDate: 786, endDate: 809, status: 'Direct Control' },
  { id: 'e20', rulerId: 'harun_al_rashid', regionId: 'fars', startDate: 786, endDate: 809, status: 'Direct Control' },
  { id: 'e21', rulerId: 'harun_al_rashid', regionId: 'jibal', startDate: 786, endDate: 809, status: 'Direct Control' },
  { id: 'e22', rulerId: 'harun_al_rashid', regionId: 'khorasan', startDate: 786, endDate: 809, status: 'Direct Control' },
  
  // Shervin I (Bavandid Enclave)
  { id: 'e23', rulerId: 'shervin_i', regionId: 'tabaristan', startDate: 772, endDate: 817, status: 'Vassal State' },
  
  // Buyid (Adud al-Dawla)
  { id: 'e24', rulerId: 'adud_al_dawla', regionId: 'fars', startDate: 949, endDate: 983, status: 'Direct Control' },
  { id: 'e25', rulerId: 'adud_al_dawla', regionId: 'jibal', startDate: 977, endDate: 983, status: 'Direct Control' },
  { id: 'e26', rulerId: 'adud_al_dawla', regionId: 'mesopotamia', startDate: 978, endDate: 983, status: 'Direct Control' },
  
  // Samanid (Ismail)
  { id: 'e27', rulerId: 'ismail_samanid', regionId: 'transoxiana', startDate: 892, endDate: 907, status: 'Direct Control' },
  { id: 'e28', rulerId: 'ismail_samanid', regionId: 'khorasan', startDate: 900, endDate: 907, status: 'Direct Control' },
  
  // Safavid (Abbas)
  { id: 'e29', rulerId: 'abbas_great', regionId: 'fars', startDate: 1588, endDate: 1629, status: 'Direct Control' },
  { id: 'e30', rulerId: 'abbas_great', regionId: 'jibal', startDate: 1588, endDate: 1629, status: 'Direct Control' },
  { id: 'e31', rulerId: 'abbas_great', regionId: 'khorasan', startDate: 1598, endDate: 1629, status: 'Direct Control' },
  { id: 'e32', rulerId: 'abbas_great', regionId: 'caucasus', startDate: 1606, endDate: 1629, status: 'Direct Control' },
  { id: 'e33', rulerId: 'abbas_great', regionId: 'mesopotamia', startDate: 1623, endDate: 1629, status: 'Direct Control' },
  
  // Qajar (Naser al-Din)
  { id: 'e34', rulerId: 'naser_al_din', regionId: 'fars', startDate: 1848, endDate: 1896, status: 'Direct Control' },
  { id: 'e35', rulerId: 'naser_al_din', regionId: 'jibal', startDate: 1848, endDate: 1896, status: 'Direct Control' },
  { id: 'e36', rulerId: 'naser_al_din', regionId: 'khorasan', startDate: 1848, endDate: 1896, status: 'Direct Control' },
  { id: 'e37', rulerId: 'naser_al_din', regionId: 'tabaristan', startDate: 1848, endDate: 1896, status: 'Direct Control' },
  
  // 1907 Spheres of Influence
  { id: 'e38', rulerId: 'nicholas_ii', regionId: 'tabaristan', startDate: 1907, endDate: 1917, status: 'Sphere of Influence' },
  { id: 'e39', rulerId: 'nicholas_ii', regionId: 'khorasan', startDate: 1907, endDate: 1917, status: 'Sphere of Influence' },
  { id: 'e40', rulerId: 'george_v', regionId: 'sistan', startDate: 1910, endDate: 1936, status: 'Sphere of Influence' },
  { id: 'e41', rulerId: 'george_v', regionId: 'fars', startDate: 1910, endDate: 1936, status: 'Sphere of Influence' },

  // Saffarid
  { id: 'e42', rulerId: 'yaqub_saffarid', regionId: 'sistan', startDate: 861, endDate: 879, status: 'Direct Control' },
  { id: 'e43', rulerId: 'yaqub_saffarid', regionId: 'khorasan', startDate: 873, endDate: 879, status: 'Direct Control' },
  { id: 'e44', rulerId: 'yaqub_saffarid', regionId: 'fars', startDate: 869, endDate: 879, status: 'Direct Control' },

  // Ziyarid
  { id: 'e45', rulerId: 'mardavij_ziyarid', regionId: 'tabaristan', startDate: 930, endDate: 935, status: 'Direct Control' },
  { id: 'e46', rulerId: 'mardavij_ziyarid', regionId: 'jibal', startDate: 931, endDate: 935, status: 'Direct Control' },

  // Jalayirid
  { id: 'e47', rulerId: 'hasan_buzurg', regionId: 'mesopotamia', startDate: 1336, endDate: 1356, status: 'Direct Control' },
  { id: 'e48', rulerId: 'hasan_buzurg', regionId: 'jibal', startDate: 1336, endDate: 1356, status: 'Contested/Warzone' },

  // Muzaffarid
  { id: 'e49', rulerId: 'mubariz_al_din', regionId: 'fars', startDate: 1314, endDate: 1358, status: 'Direct Control' },
  { id: 'e50', rulerId: 'mubariz_al_din', regionId: 'jibal', startDate: 1353, endDate: 1358, status: 'Contested/Warzone' },

  // Elamite
  { id: 'e51', rulerId: 'untash_napirisha', regionId: 'fars', startDate: -1300, endDate: -1260, status: 'Direct Control' },
  { id: 'e52', rulerId: 'untash_napirisha', regionId: 'mesopotamia', startDate: -1300, endDate: -1260, status: 'Direct Control' },
  { id: 'e53', rulerId: 'shutruk_nahhunte', regionId: 'fars', startDate: -1184, endDate: -1155, status: 'Direct Control' },
  { id: 'e54', rulerId: 'shutruk_nahhunte', regionId: 'mesopotamia', startDate: -1184, endDate: -1155, status: 'Direct Control' },
  { id: 'e55', rulerId: 'humban_haltash_iii', regionId: 'fars', startDate: -650, endDate: -640, status: 'Direct Control' },
  // Median
  { id: 'e56', rulerId: 'cyaxares', regionId: 'jibal', startDate: -625, endDate: -585, status: 'Direct Control' },
  { id: 'e57', rulerId: 'cyaxares', regionId: 'anatolia', startDate: -625, endDate: -585, status: 'Direct Control' },
  { id: 'e58', rulerId: 'cyaxares', regionId: 'khorasan', startDate: -625, endDate: -585, status: 'Direct Control' },
  { id: 'e59', rulerId: 'astyages', regionId: 'jibal', startDate: -585, endDate: -550, status: 'Direct Control' },
  { id: 'e60', rulerId: 'astyages', regionId: 'anatolia', startDate: -585, endDate: -550, status: 'Direct Control' },
  { id: 'e61', rulerId: 'astyages', regionId: 'khorasan', startDate: -585, endDate: -550, status: 'Direct Control' },
  // Achaemenid
  { id: 'e62', rulerId: 'darius_great', regionId: 'fars', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e63', rulerId: 'darius_great', regionId: 'jibal', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e64', rulerId: 'darius_great', regionId: 'mesopotamia', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e65', rulerId: 'darius_great', regionId: 'anatolia', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e66', rulerId: 'darius_great', regionId: 'khorasan', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e67', rulerId: 'darius_great', regionId: 'transoxiana', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e68', rulerId: 'darius_great', regionId: 'sistan', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e69', rulerId: 'darius_great', regionId: 'bactria', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e70', rulerId: 'darius_great', regionId: 'indus', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e71', rulerId: 'darius_great', regionId: 'caucasus', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e236', rulerId: 'darius_great', regionId: 'tabaristan', startDate: -522, endDate: -486, status: 'Direct Control' },
  { id: 'e72', rulerId: 'darius_iii', regionId: 'fars', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e73', rulerId: 'darius_iii', regionId: 'jibal', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e74', rulerId: 'darius_iii', regionId: 'mesopotamia', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e75', rulerId: 'darius_iii', regionId: 'anatolia', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e76', rulerId: 'darius_iii', regionId: 'khorasan', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e77', rulerId: 'darius_iii', regionId: 'transoxiana', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e78', rulerId: 'darius_iii', regionId: 'sistan', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e79', rulerId: 'darius_iii', regionId: 'bactria', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e80', rulerId: 'darius_iii', regionId: 'indus', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e81', rulerId: 'darius_iii', regionId: 'caucasus', startDate: -336, endDate: -330, status: 'Direct Control' },
  { id: 'e237', rulerId: 'darius_iii', regionId: 'tabaristan', startDate: -336, endDate: -330, status: 'Direct Control' },
  // Seleucid
  { id: 'e82', rulerId: 'antiochus_iii', regionId: 'mesopotamia', startDate: -222, endDate: -187, status: 'Direct Control' },
  { id: 'e83', rulerId: 'antiochus_iii', regionId: 'jibal', startDate: -222, endDate: -187, status: 'Direct Control' },
  { id: 'e84', rulerId: 'antiochus_iii', regionId: 'fars', startDate: -222, endDate: -187, status: 'Direct Control' },
  { id: 'e85', rulerId: 'antiochus_iii', regionId: 'khorasan', startDate: -222, endDate: -187, status: 'Direct Control' },
  { id: 'e86', rulerId: 'antiochus_vii', regionId: 'mesopotamia', startDate: -138, endDate: -129, status: 'Direct Control' },
  { id: 'e87', rulerId: 'antiochus_vii', regionId: 'jibal', startDate: -138, endDate: -129, status: 'Direct Control' },
  // Greco-Bactrian
  { id: 'e88', rulerId: 'diodotus_i', regionId: 'bactria', startDate: -250, endDate: -230, status: 'Direct Control' },
  { id: 'e89', rulerId: 'diodotus_i', regionId: 'transoxiana', startDate: -250, endDate: -230, status: 'Direct Control' },
  { id: 'e90', rulerId: 'heliocles_i', regionId: 'bactria', startDate: -145, endDate: -130, status: 'Direct Control' },
  // Sasanian
  { id: 'e91', rulerId: 'ardashir_i', regionId: 'fars', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e92', rulerId: 'ardashir_i', regionId: 'jibal', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e93', rulerId: 'ardashir_i', regionId: 'mesopotamia', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e94', rulerId: 'ardashir_i', regionId: 'khorasan', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e95', rulerId: 'yazdegerd_iii', regionId: 'fars', startDate: 632, endDate: 651, status: 'Direct Control' },
  { id: 'e96', rulerId: 'yazdegerd_iii', regionId: 'jibal', startDate: 632, endDate: 651, status: 'Direct Control' },
  { id: 'e97', rulerId: 'yazdegerd_iii', regionId: 'khorasan', startDate: 632, endDate: 651, status: 'Direct Control' },
  // Abbasid
  { id: 'e98', rulerId: 'al_mansur', regionId: 'mesopotamia', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e99', rulerId: 'al_mansur', regionId: 'jibal', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e100', rulerId: 'al_mansur', regionId: 'fars', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e101', rulerId: 'al_mansur', regionId: 'khorasan', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e102', rulerId: 'al_mansur', regionId: 'transoxiana', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e103', rulerId: 'al_mansur', regionId: 'sistan', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e104', rulerId: 'al_mansur', regionId: 'bactria', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e105', rulerId: 'al_mustasim', regionId: 'mesopotamia', startDate: 1242, endDate: 1258, status: 'Direct Control' },
  // Tahirid
  { id: 'e106', rulerId: 'tahir_ibn_husayn', regionId: 'khorasan', startDate: 821, endDate: 822, status: 'Direct Control' },
  { id: 'e107', rulerId: 'tahir_ibn_husayn', regionId: 'transoxiana', startDate: 821, endDate: 822, status: 'Direct Control' },
  { id: 'e108', rulerId: 'muhammad_ibn_tahir', regionId: 'khorasan', startDate: 862, endDate: 873, status: 'Direct Control' },
  // Saffarid
  { id: 'e109', rulerId: 'amr_ibn_al_layth', regionId: 'sistan', startDate: 879, endDate: 901, status: 'Direct Control' },
  { id: 'e110', rulerId: 'amr_ibn_al_layth', regionId: 'khorasan', startDate: 879, endDate: 901, status: 'Direct Control' },
  { id: 'e111', rulerId: 'amr_ibn_al_layth', regionId: 'fars', startDate: 879, endDate: 901, status: 'Direct Control' },
  { id: 'e112', rulerId: 'khalaf_ibn_ahmad', regionId: 'sistan', startDate: 963, endDate: 1002, status: 'Direct Control' },
  // Ziyarid
  { id: 'e113', rulerId: 'qabus_ibn_voshmgir', regionId: 'tabaristan', startDate: 977, endDate: 1012, status: 'Direct Control' },
  { id: 'e114', rulerId: 'gilanshah', regionId: 'tabaristan', startDate: 1087, endDate: 1090, status: 'Direct Control' },
  // Buyid
  { id: 'e115', rulerId: 'abu_kalijar', regionId: 'fars', startDate: 1024, endDate: 1048, status: 'Direct Control' },
  { id: 'e116', rulerId: 'abu_kalijar', regionId: 'mesopotamia', startDate: 1024, endDate: 1048, status: 'Direct Control' },
  // Seljuk
  { id: 'e117', rulerId: 'tughril_beg', regionId: 'khorasan', startDate: 1037, endDate: 1063, status: 'Direct Control' },
  { id: 'e118', rulerId: 'tughril_beg', regionId: 'jibal', startDate: 1037, endDate: 1063, status: 'Direct Control' },
  { id: 'e119', rulerId: 'tughril_beg', regionId: 'fars', startDate: 1037, endDate: 1063, status: 'Direct Control' },
  { id: 'e120', rulerId: 'tughril_beg', regionId: 'mesopotamia', startDate: 1037, endDate: 1063, status: 'Direct Control' },
  { id: 'e121', rulerId: 'tughril_beg', regionId: 'anatolia', startDate: 1037, endDate: 1063, status: 'Direct Control' },
  { id: 'e122', rulerId: 'ahmad_sanjar', regionId: 'khorasan', startDate: 1118, endDate: 1153, status: 'Direct Control' },
  { id: 'e123', rulerId: 'ahmad_sanjar', regionId: 'transoxiana', startDate: 1118, endDate: 1153, status: 'Direct Control' },
  { id: 'e124', rulerId: 'ahmad_sanjar', regionId: 'sistan', startDate: 1118, endDate: 1153, status: 'Direct Control' },
  { id: 'e125', rulerId: 'tughril_iii', regionId: 'jibal', startDate: 1176, endDate: 1194, status: 'Direct Control' },
  // Khwarazmian
  { id: 'e126', rulerId: 'ala_al_din_tekish', regionId: 'transoxiana', startDate: 1172, endDate: 1200, status: 'Direct Control' },
  { id: 'e127', rulerId: 'ala_al_din_tekish', regionId: 'khorasan', startDate: 1172, endDate: 1200, status: 'Direct Control' },
  { id: 'e128', rulerId: 'ala_al_din_tekish', regionId: 'jibal', startDate: 1172, endDate: 1200, status: 'Direct Control' },
  { id: 'e129', rulerId: 'muhammad_ii', regionId: 'transoxiana', startDate: 1200, endDate: 1220, status: 'Direct Control' },
  { id: 'e130', rulerId: 'muhammad_ii', regionId: 'khorasan', startDate: 1200, endDate: 1220, status: 'Direct Control' },
  { id: 'e131', rulerId: 'muhammad_ii', regionId: 'jibal', startDate: 1200, endDate: 1220, status: 'Direct Control' },
  { id: 'e132', rulerId: 'muhammad_ii', regionId: 'fars', startDate: 1200, endDate: 1220, status: 'Direct Control' },
  { id: 'e133', rulerId: 'muhammad_ii', regionId: 'sistan', startDate: 1200, endDate: 1220, status: 'Direct Control' },
  // Ilkhanate
  { id: 'e134', rulerId: 'hulagu_khan', regionId: 'jibal', startDate: 1256, endDate: 1265, status: 'Direct Control' },
  { id: 'e135', rulerId: 'hulagu_khan', regionId: 'fars', startDate: 1256, endDate: 1265, status: 'Direct Control' },
  { id: 'e136', rulerId: 'hulagu_khan', regionId: 'khorasan', startDate: 1256, endDate: 1265, status: 'Direct Control' },
  { id: 'e137', rulerId: 'hulagu_khan', regionId: 'mesopotamia', startDate: 1256, endDate: 1265, status: 'Direct Control' },
  { id: 'e138', rulerId: 'hulagu_khan', regionId: 'caucasus', startDate: 1256, endDate: 1265, status: 'Direct Control' },
  { id: 'e139', rulerId: 'hulagu_khan', regionId: 'anatolia', startDate: 1256, endDate: 1265, status: 'Direct Control' },
  { id: 'e140', rulerId: 'ghazan_khan', regionId: 'jibal', startDate: 1295, endDate: 1304, status: 'Direct Control' },
  { id: 'e141', rulerId: 'ghazan_khan', regionId: 'fars', startDate: 1295, endDate: 1304, status: 'Direct Control' },
  { id: 'e142', rulerId: 'ghazan_khan', regionId: 'khorasan', startDate: 1295, endDate: 1304, status: 'Direct Control' },
  { id: 'e143', rulerId: 'ghazan_khan', regionId: 'mesopotamia', startDate: 1295, endDate: 1304, status: 'Direct Control' },
  { id: 'e144', rulerId: 'ghazan_khan', regionId: 'caucasus', startDate: 1295, endDate: 1304, status: 'Direct Control' },
  { id: 'e145', rulerId: 'ghazan_khan', regionId: 'anatolia', startDate: 1295, endDate: 1304, status: 'Direct Control' },
  { id: 'e146', rulerId: 'abu_said_bahadur', regionId: 'jibal', startDate: 1316, endDate: 1335, status: 'Direct Control' },
  { id: 'e147', rulerId: 'abu_said_bahadur', regionId: 'fars', startDate: 1316, endDate: 1335, status: 'Direct Control' },
  { id: 'e148', rulerId: 'abu_said_bahadur', regionId: 'khorasan', startDate: 1316, endDate: 1335, status: 'Direct Control' },
  { id: 'e149', rulerId: 'abu_said_bahadur', regionId: 'mesopotamia', startDate: 1316, endDate: 1335, status: 'Direct Control' },
  { id: 'e150', rulerId: 'abu_said_bahadur', regionId: 'caucasus', startDate: 1316, endDate: 1335, status: 'Direct Control' },
  { id: 'e151', rulerId: 'abu_said_bahadur', regionId: 'anatolia', startDate: 1316, endDate: 1335, status: 'Direct Control' },
  // Jalayirid
  { id: 'e152', rulerId: 'shaykh_uways', regionId: 'mesopotamia', startDate: 1356, endDate: 1374, status: 'Direct Control' },
  { id: 'e153', rulerId: 'shaykh_uways', regionId: 'jibal', startDate: 1356, endDate: 1374, status: 'Direct Control' },
  { id: 'e154', rulerId: 'shaykh_uways', regionId: 'caucasus', startDate: 1356, endDate: 1374, status: 'Direct Control' },
  { id: 'e155', rulerId: 'husayn_jalayir', regionId: 'mesopotamia', startDate: 1374, endDate: 1382, status: 'Direct Control' },
  { id: 'e156', rulerId: 'husayn_jalayir', regionId: 'jibal', startDate: 1374, endDate: 1382, status: 'Direct Control' },
  // Muzaffarid
  { id: 'e157', rulerId: 'shah_shuja', regionId: 'fars', startDate: 1358, endDate: 1384, status: 'Direct Control' },
  { id: 'e158', rulerId: 'shah_shuja', regionId: 'jibal', startDate: 1358, endDate: 1384, status: 'Direct Control' },
  { id: 'e159', rulerId: 'shah_mansur', regionId: 'fars', startDate: 1387, endDate: 1393, status: 'Direct Control' },
  // Timurid
  { id: 'e160', rulerId: 'timur', regionId: 'transoxiana', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e161', rulerId: 'timur', regionId: 'khorasan', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e162', rulerId: 'timur', regionId: 'sistan', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e163', rulerId: 'timur', regionId: 'fars', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e164', rulerId: 'timur', regionId: 'jibal', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e165', rulerId: 'timur', regionId: 'mesopotamia', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e166', rulerId: 'timur', regionId: 'caucasus', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e167', rulerId: 'timur', regionId: 'anatolia', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e168', rulerId: 'timur', regionId: 'bactria', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e169', rulerId: 'timur', regionId: 'indus', startDate: 1370, endDate: 1405, status: 'Direct Control' },
  { id: 'e170', rulerId: 'shahrukh', regionId: 'khorasan', startDate: 1405, endDate: 1447, status: 'Direct Control' },
  { id: 'e171', rulerId: 'shahrukh', regionId: 'transoxiana', startDate: 1405, endDate: 1447, status: 'Direct Control' },
  { id: 'e172', rulerId: 'shahrukh', regionId: 'sistan', startDate: 1405, endDate: 1447, status: 'Direct Control' },
  { id: 'e173', rulerId: 'shahrukh', regionId: 'fars', startDate: 1405, endDate: 1447, status: 'Direct Control' },
  { id: 'e174', rulerId: 'shahrukh', regionId: 'jibal', startDate: 1405, endDate: 1447, status: 'Direct Control' },
  { id: 'e175', rulerId: 'husayn_bayqara', regionId: 'khorasan', startDate: 1469, endDate: 1506, status: 'Direct Control' },
  // Aq Qoyunlu
  { id: 'e176', rulerId: 'uzun_hasan', regionId: 'caucasus', startDate: 1453, endDate: 1478, status: 'Direct Control' },
  { id: 'e177', rulerId: 'uzun_hasan', regionId: 'anatolia', startDate: 1453, endDate: 1478, status: 'Direct Control' },
  { id: 'e178', rulerId: 'uzun_hasan', regionId: 'mesopotamia', startDate: 1453, endDate: 1478, status: 'Direct Control' },
  { id: 'e179', rulerId: 'uzun_hasan', regionId: 'jibal', startDate: 1453, endDate: 1478, status: 'Direct Control' },
  { id: 'e180', rulerId: 'uzun_hasan', regionId: 'fars', startDate: 1453, endDate: 1478, status: 'Direct Control' },
  { id: 'e181', rulerId: 'murad_aq_qoyunlu', regionId: 'fars', startDate: 1497, endDate: 1508, status: 'Direct Control' },
  { id: 'e182', rulerId: 'murad_aq_qoyunlu', regionId: 'mesopotamia', startDate: 1497, endDate: 1508, status: 'Direct Control' },
  // Safavid
  { id: 'e183', rulerId: 'ismail_i', regionId: 'caucasus', startDate: 1501, endDate: 1524, status: 'Direct Control' },
  { id: 'e184', rulerId: 'ismail_i', regionId: 'jibal', startDate: 1501, endDate: 1524, status: 'Direct Control' },
  { id: 'e185', rulerId: 'ismail_i', regionId: 'fars', startDate: 1501, endDate: 1524, status: 'Direct Control' },
  { id: 'e186', rulerId: 'ismail_i', regionId: 'mesopotamia', startDate: 1501, endDate: 1524, status: 'Direct Control' },
  { id: 'e187', rulerId: 'ismail_i', regionId: 'khorasan', startDate: 1501, endDate: 1524, status: 'Direct Control' },
  { id: 'e188', rulerId: 'sultan_husayn', regionId: 'jibal', startDate: 1694, endDate: 1722, status: 'Direct Control' },
  { id: 'e189', rulerId: 'sultan_husayn', regionId: 'fars', startDate: 1694, endDate: 1722, status: 'Direct Control' },
  { id: 'e190', rulerId: 'sultan_husayn', regionId: 'khorasan', startDate: 1694, endDate: 1722, status: 'Direct Control' },
  { id: 'e191', rulerId: 'sultan_husayn', regionId: 'caucasus', startDate: 1694, endDate: 1722, status: 'Direct Control' },
  // Afsharid
  { id: 'e192', rulerId: 'nader_shah', regionId: 'khorasan', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e193', rulerId: 'nader_shah', regionId: 'jibal', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e194', rulerId: 'nader_shah', regionId: 'fars', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e195', rulerId: 'nader_shah', regionId: 'caucasus', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e196', rulerId: 'nader_shah', regionId: 'mesopotamia', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e197', rulerId: 'nader_shah', regionId: 'transoxiana', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e198', rulerId: 'nader_shah', regionId: 'bactria', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e199', rulerId: 'nader_shah', regionId: 'indus', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e200', rulerId: 'shahrokh_afshar', regionId: 'khorasan', startDate: 1748, endDate: 1796, status: 'Direct Control' },
  // Zand
  { id: 'e201', rulerId: 'karim_khan', regionId: 'fars', startDate: 1751, endDate: 1779, status: 'Direct Control' },
  { id: 'e202', rulerId: 'karim_khan', regionId: 'jibal', startDate: 1751, endDate: 1779, status: 'Direct Control' },
  { id: 'e203', rulerId: 'karim_khan', regionId: 'mesopotamia', startDate: 1751, endDate: 1779, status: 'Direct Control' },
  { id: 'e204', rulerId: 'karim_khan', regionId: 'caucasus', startDate: 1751, endDate: 1779, status: 'Direct Control' },
  { id: 'e205', rulerId: 'lotf_ali_khan', regionId: 'fars', startDate: 1789, endDate: 1794, status: 'Direct Control' },
  // Qajar
  { id: 'e206', rulerId: 'agha_mohammad_khan', regionId: 'jibal', startDate: 1789, endDate: 1797, status: 'Direct Control' },
  { id: 'e207', rulerId: 'agha_mohammad_khan', regionId: 'fars', startDate: 1789, endDate: 1797, status: 'Direct Control' },
  { id: 'e208', rulerId: 'agha_mohammad_khan', regionId: 'khorasan', startDate: 1789, endDate: 1797, status: 'Direct Control' },
  { id: 'e209', rulerId: 'agha_mohammad_khan', regionId: 'caucasus', startDate: 1789, endDate: 1797, status: 'Direct Control' },
  { id: 'e210', rulerId: 'agha_mohammad_khan', regionId: 'tabaristan', startDate: 1789, endDate: 1797, status: 'Direct Control' },
  { id: 'e211', rulerId: 'ahmad_shah_qajar', regionId: 'jibal', startDate: 1909, endDate: 1925, status: 'Direct Control' },
  { id: 'e212', rulerId: 'ahmad_shah_qajar', regionId: 'fars', startDate: 1909, endDate: 1925, status: 'Direct Control' },
  { id: 'e213', rulerId: 'ahmad_shah_qajar', regionId: 'khorasan', startDate: 1909, endDate: 1925, status: 'Direct Control' },
  { id: 'e214', rulerId: 'ahmad_shah_qajar', regionId: 'tabaristan', startDate: 1909, endDate: 1925, status: 'Direct Control' },
  // Pahlavi
  { id: 'e215', rulerId: 'reza_shah', regionId: 'jibal', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e216', rulerId: 'reza_shah', regionId: 'fars', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e217', rulerId: 'reza_shah', regionId: 'khorasan', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e218', rulerId: 'reza_shah', regionId: 'tabaristan', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e219', rulerId: 'reza_shah', regionId: 'sistan', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e220', rulerId: 'mohammad_reza_shah', regionId: 'jibal', startDate: 1941, endDate: 1979, status: 'Direct Control' },
  { id: 'e221', rulerId: 'mohammad_reza_shah', regionId: 'fars', startDate: 1941, endDate: 1979, status: 'Direct Control' },
  { id: 'e222', rulerId: 'mohammad_reza_shah', regionId: 'khorasan', startDate: 1941, endDate: 1979, status: 'Direct Control' },
  { id: 'e223', rulerId: 'mohammad_reza_shah', regionId: 'tabaristan', startDate: 1941, endDate: 1979, status: 'Direct Control' },
  { id: 'e224', rulerId: 'mohammad_reza_shah', regionId: 'sistan', startDate: 1941, endDate: 1979, status: 'Direct Control' },
  // Islamic Republic
  { id: 'e225', rulerId: 'khomeini', regionId: 'jibal', startDate: 1979, endDate: 1989, status: 'Direct Control' },
  { id: 'e226', rulerId: 'khomeini', regionId: 'fars', startDate: 1979, endDate: 1989, status: 'Direct Control' },
  { id: 'e227', rulerId: 'khomeini', regionId: 'khorasan', startDate: 1979, endDate: 1989, status: 'Direct Control' },
  { id: 'e228', rulerId: 'khomeini', regionId: 'tabaristan', startDate: 1979, endDate: 1989, status: 'Direct Control' },
  { id: 'e229', rulerId: 'khomeini', regionId: 'sistan', startDate: 1979, endDate: 1989, status: 'Direct Control' },
  { id: 'e230', rulerId: 'khamenei', regionId: 'jibal', startDate: 1989, endDate: 2024, status: 'Direct Control' },
  { id: 'e231', rulerId: 'khamenei', regionId: 'fars', startDate: 1989, endDate: 2024, status: 'Direct Control' },
  { id: 'e232', rulerId: 'khamenei', regionId: 'khorasan', startDate: 1989, endDate: 2024, status: 'Direct Control' },
  { id: 'e233', rulerId: 'khamenei', regionId: 'tabaristan', startDate: 1989, endDate: 2024, status: 'Direct Control' },
  { id: 'e234', rulerId: 'khamenei', regionId: 'sistan', startDate: 1989, endDate: 2024, status: 'Direct Control' },
  // 542 BC Context
  { id: 'e238', rulerId: 'nabonidus', regionId: 'mesopotamia', startDate: -556, endDate: -539, status: 'Direct Control' },
  { id: 'e239', rulerId: 'pukkusati', regionId: 'indus', startDate: -550, endDate: -500, status: 'Direct Control' },
  { id: 'e240', rulerId: 'cyrus_great', regionId: 'caucasus', startDate: -550, endDate: -530, status: 'Direct Control' },
  { id: 'e241', rulerId: 'cyrus_great', regionId: 'sistan', startDate: -545, endDate: -530, status: 'Direct Control' },
  { id: 'e242', rulerId: 'cyrus_great', regionId: 'bactria', startDate: -545, endDate: -530, status: 'Direct Control' },
  { id: 'e243', rulerId: 'cyrus_great', regionId: 'transoxiana', startDate: -545, endDate: -530, status: 'Direct Control' },
  // ── Iranian Azerbaijan ─────────────────────────────────────────────────────
  // The region (modern East/West Azerbaijan + Ardabil) was historically distinct
  // from the Caucasus (north of the Aras) and from Jibal to the south.
  // It was the heartland of the Safavid dynasty (Ardabil shrine) and contested
  // between Iran and its neighbours throughout history.

  // Cyrus the Great — absorbed Median territories including Azerbaijan
  { id: 'e_azb_1', rulerId: 'cyrus_great', regionId: 'iranian_azerbaijan', startDate: -550, endDate: -530, status: 'Direct Control' },
  // Darius the Great
  { id: 'e_azb_2', rulerId: 'darius_great', regionId: 'iranian_azerbaijan', startDate: -522, endDate: -486, status: 'Direct Control' },
  // Darius III
  { id: 'e_azb_3', rulerId: 'darius_iii', regionId: 'iranian_azerbaijan', startDate: -336, endDate: -330, status: 'Direct Control' },
  // Median rulers (Cyaxares, Astyages) — Azerbaijan was in the Median heartland
  { id: 'e_azb_4', rulerId: 'cyaxares', regionId: 'iranian_azerbaijan', startDate: -625, endDate: -585, status: 'Direct Control' },
  { id: 'e_azb_5', rulerId: 'astyages', regionId: 'iranian_azerbaijan', startDate: -585, endDate: -550, status: 'Direct Control' },
  // Seleucid — Antiochus I held Azerbaijan briefly
  { id: 'e_azb_6', rulerId: 'seleucus_i', regionId: 'iranian_azerbaijan', startDate: -305, endDate: -281, status: 'Sphere of Influence' },
  { id: 'e_azb_7', rulerId: 'antiochus_iii', regionId: 'iranian_azerbaijan', startDate: -222, endDate: -187, status: 'Sphere of Influence' },
  // Arsacid/Parthian — Mithridates I consolidated Az
  { id: 'e_azb_8', rulerId: 'mithridates_i', regionId: 'iranian_azerbaijan', startDate: -148, endDate: -132, status: 'Direct Control' },
  // Sasanian — Ardashir I & Khosrow II
  { id: 'e_azb_9', rulerId: 'ardashir_i', regionId: 'iranian_azerbaijan', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e_azb_10', rulerId: 'khosrow_ii', regionId: 'iranian_azerbaijan', startDate: 590, endDate: 628, status: 'Direct Control' },
  { id: 'e_azb_11', rulerId: 'yazdegerd_iii', regionId: 'iranian_azerbaijan', startDate: 632, endDate: 651, status: 'Direct Control' },
  // Abbasid Caliphate
  { id: 'e_azb_12', rulerId: 'al_mansur', regionId: 'iranian_azerbaijan', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e_azb_13', rulerId: 'harun_al_rashid', regionId: 'iranian_azerbaijan', startDate: 786, endDate: 809, status: 'Direct Control' },
  // Ilkhanate — Mongols made Tabriz their western capital
  { id: 'e_azb_14', rulerId: 'hulagu_khan', regionId: 'iranian_azerbaijan', startDate: 1256, endDate: 1265, status: 'Direct Control' },
  { id: 'e_azb_15', rulerId: 'ghazan_khan', regionId: 'iranian_azerbaijan', startDate: 1295, endDate: 1304, status: 'Direct Control' },
  { id: 'e_azb_16', rulerId: 'abu_said_bahadur', regionId: 'iranian_azerbaijan', startDate: 1316, endDate: 1335, status: 'Direct Control' },
  // Jalayirid — Tabriz was their capital
  { id: 'e_azb_17', rulerId: 'hasan_buzurg', regionId: 'iranian_azerbaijan', startDate: 1336, endDate: 1356, status: 'Direct Control' },
  { id: 'e_azb_18', rulerId: 'shaykh_uways', regionId: 'iranian_azerbaijan', startDate: 1356, endDate: 1374, status: 'Direct Control' },
  { id: 'e_azb_19', rulerId: 'husayn_jalayir', regionId: 'iranian_azerbaijan', startDate: 1374, endDate: 1382, status: 'Direct Control' },
  // Timurid — Timur sacked Tabriz
  { id: 'e_azb_20', rulerId: 'timur', regionId: 'iranian_azerbaijan', startDate: 1386, endDate: 1405, status: 'Direct Control' },
  // Aq Qoyunlu — Uzun Hasan ruled from Tabriz
  { id: 'e_azb_21', rulerId: 'uzun_hasan', regionId: 'iranian_azerbaijan', startDate: 1453, endDate: 1478, status: 'Direct Control' },
  { id: 'e_azb_22', rulerId: 'murad_aq_qoyunlu', regionId: 'iranian_azerbaijan', startDate: 1497, endDate: 1508, status: 'Direct Control' },
  // Safavid — Ardabil was the Safavid spiritual heartland; Ismail I was born there
  { id: 'e_azb_23', rulerId: 'ismail_i', regionId: 'iranian_azerbaijan', startDate: 1501, endDate: 1524, status: 'Direct Control' },
  { id: 'e_azb_24', rulerId: 'abbas_great', regionId: 'iranian_azerbaijan', startDate: 1588, endDate: 1629, status: 'Direct Control' },
  { id: 'e_azb_25', rulerId: 'sultan_husayn', regionId: 'iranian_azerbaijan', startDate: 1694, endDate: 1722, status: 'Direct Control' },
  // Afsharid — Nader Shah briefly held Azerbaijan before Russo-Ottoman pressure
  { id: 'e_azb_26', rulerId: 'nader_shah', regionId: 'iranian_azerbaijan', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  // Zand — Karim Khan's sphere extended to Azerbaijan
  { id: 'e_azb_27', rulerId: 'karim_khan', regionId: 'iranian_azerbaijan', startDate: 1751, endDate: 1779, status: 'Sphere of Influence' },
  // Qajar — Agha Mohammad Khan reunified it; Qajar dynasty was of Azerbaijani-Turkic origin
  { id: 'e_azb_28', rulerId: 'agha_mohammad_khan', regionId: 'iranian_azerbaijan', startDate: 1789, endDate: 1797, status: 'Direct Control' },
  { id: 'e_azb_29', rulerId: 'naser_al_din', regionId: 'iranian_azerbaijan', startDate: 1848, endDate: 1896, status: 'Direct Control' },
  { id: 'e_azb_30', rulerId: 'ahmad_shah_qajar', regionId: 'iranian_azerbaijan', startDate: 1909, endDate: 1925, status: 'Direct Control' },
  // 1907 Anglo-Russian Convention — Russia's sphere extended into N. Azerbaijan
  { id: 'e_azb_31', rulerId: 'nicholas_ii', regionId: 'iranian_azerbaijan', startDate: 1907, endDate: 1917, status: 'Sphere of Influence' },
  // Pahlavi
  { id: 'e_azb_32', rulerId: 'reza_shah', regionId: 'iranian_azerbaijan', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e_azb_33', rulerId: 'mohammad_reza_shah', regionId: 'iranian_azerbaijan', startDate: 1941, endDate: 1979, status: 'Direct Control' },
  // Islamic Republic
  { id: 'e_azb_34', rulerId: 'khomeini', regionId: 'iranian_azerbaijan', startDate: 1979, endDate: 1989, status: 'Direct Control' },
  { id: 'e_azb_35', rulerId: 'khamenei', regionId: 'iranian_azerbaijan', startDate: 1989, endDate: 2024, status: 'Direct Control' },
  
  // ── Khuzestan / Elam ──
  { id: 'e_khuz_1', rulerId: 'cyrus_great', regionId: 'khuzestan', startDate: -550, endDate: -530, status: 'Direct Control' },
  { id: 'e_khuz_2', rulerId: 'ardashir_i', regionId: 'khuzestan', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e_khuz_3', rulerId: 'al_mansur', regionId: 'khuzestan', startDate: 754, endDate: 775, status: 'Direct Control' },
  { id: 'e_khuz_4', rulerId: 'abbas_great', regionId: 'khuzestan', startDate: 1588, endDate: 1629, status: 'Direct Control' },
  { id: 'e_khuz_5', rulerId: 'reza_shah', regionId: 'khuzestan', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e_khuz_6', rulerId: 'khamenei', regionId: 'khuzestan', startDate: 1989, endDate: 2024, status: 'Direct Control' },

  // ── Gilan ──
  { id: 'e_gil_1', rulerId: 'ismail_i', regionId: 'Gilan', startDate: 1501, endDate: 1524, status: 'Direct Control' },
  { id: 'e_gil_2', rulerId: 'abbas_great', regionId: 'Gilan', startDate: 1588, endDate: 1629, status: 'Direct Control' },
  { id: 'e_gil_3', rulerId: 'reza_shah', regionId: 'Gilan', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e_gil_4', rulerId: 'khamenei', regionId: 'Gilan', startDate: 1989, endDate: 2024, status: 'Direct Control' },

  // ── Kurdistan / Hulwan ──
  { id: 'e_kur_1', rulerId: 'cyrus_great', regionId: 'kurdistan', startDate: -550, endDate: -530, status: 'Direct Control' },
  { id: 'e_kur_2', rulerId: 'ardashir_i', regionId: 'kurdistan', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e_kur_3', rulerId: 'abbas_great', regionId: 'kurdistan', startDate: 1588, endDate: 1629, status: 'Direct Control' },
  { id: 'e_kur_4', rulerId: 'reza_shah', regionId: 'kurdistan', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e_kur_5', rulerId: 'khamenei', regionId: 'kurdistan', startDate: 1989, endDate: 2024, status: 'Direct Control' },

  // ── Kirman ──
  { id: 'e_kir_1', rulerId: 'cyrus_great', regionId: 'kirman', startDate: -550, endDate: -530, status: 'Direct Control' },
  { id: 'e_kir_2', rulerId: 'ardashir_i', regionId: 'kirman', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e_kir_3', rulerId: 'abbas_great', regionId: 'kirman', startDate: 1588, endDate: 1629, status: 'Direct Control' },
  { id: 'e_kir_4', rulerId: 'nader_shah', regionId: 'kirman', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e_kir_5', rulerId: 'reza_shah', regionId: 'kirman', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e_kir_6', rulerId: 'khamenei', regionId: 'kirman', startDate: 1989, endDate: 2024, status: 'Direct Control' },

  // ── Makran ──
  { id: 'e_mak_1', rulerId: 'cyrus_great', regionId: 'makran', startDate: -550, endDate: -530, status: 'Direct Control' },
  { id: 'e_mak_2', rulerId: 'ardashir_i', regionId: 'makran', startDate: 224, endDate: 242, status: 'Direct Control' },
  { id: 'e_mak_3', rulerId: 'abbas_great', regionId: 'makran', startDate: 1588, endDate: 1629, status: 'Direct Control' },
  { id: 'e_mak_4', rulerId: 'nader_shah', regionId: 'makran', startDate: 1736, endDate: 1747, status: 'Direct Control' },
  { id: 'e_mak_5', rulerId: 'reza_shah', regionId: 'makran', startDate: 1925, endDate: 1941, status: 'Direct Control' },
  { id: 'e_mak_6', rulerId: 'khamenei', regionId: 'makran', startDate: 1989, endDate: 2024, status: 'Direct Control' }
];
