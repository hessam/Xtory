export type StatusInRegion = 'Direct Control' | 'Partial Control' | 'Vassal State' | 'Contested/Warzone' | 'Sphere of Influence';

export interface ReignEvent {
  id: string;
  rulerId: string;
  regionId: string;
  startDate: number;
  endDate: number;
  status: StatusInRegion;
  isAiGenerated?: boolean;
  influence?: number; // 0 to 10
}

// ── Regions Reference ──
// fars, jibal, khuzestan, mesopotamia, azerbaijan, caucasus,
// caspian_coast, khorasan, sistan, makran, transoxiana, chorasmia

export const events: ReignEvent[] = [

  // ═══════════════════════════════════════════════════════════════════
  // ACHAEMENID
  // ═══════════════════════════════════════════════════════════════════

  // Cyrus the Great (559–530 BC)
  { id: 'ev1', rulerId: 'cyrus_great', regionId: 'fars', startDate: -559, endDate: -530, status: 'Direct Control', influence: 10 },
  { id: 'ev2', rulerId: 'cyrus_great', regionId: 'jibal', startDate: -559, endDate: -530, status: 'Direct Control', influence: 10 },
  { id: 'ev3', rulerId: 'cyrus_great', regionId: 'khuzestan', startDate: -559, endDate: -530, status: 'Direct Control', influence: 9 },
  { id: 'ev4', rulerId: 'cyrus_great', regionId: 'mesopotamia', startDate: -539, endDate: -530, status: 'Direct Control', influence: 9 },
  { id: 'ev5', rulerId: 'cyrus_great', regionId: 'khorasan', startDate: -545, endDate: -530, status: 'Direct Control', influence: 8 },
  { id: 'ev6', rulerId: 'cyrus_great', regionId: 'azerbaijan', startDate: -549, endDate: -530, status: 'Direct Control', influence: 9 },
  { id: 'ev7', rulerId: 'cyrus_great', regionId: 'caspian_coast', startDate: -549, endDate: -530, status: 'Direct Control', influence: 7 },
  { id: 'ev8', rulerId: 'cyrus_great', regionId: 'transoxiana', startDate: -540, endDate: -530, status: 'Partial Control', influence: 5 },

  // Darius I (522–486 BC) — maximum extent
  { id: 'ev9', rulerId: 'darius_i', regionId: 'fars', startDate: -522, endDate: -486, status: 'Direct Control', influence: 10 },
  { id: 'ev10', rulerId: 'darius_i', regionId: 'jibal', startDate: -522, endDate: -486, status: 'Direct Control', influence: 10 },
  { id: 'ev11', rulerId: 'darius_i', regionId: 'khuzestan', startDate: -522, endDate: -486, status: 'Direct Control', influence: 10 },
  { id: 'ev12', rulerId: 'darius_i', regionId: 'mesopotamia', startDate: -522, endDate: -486, status: 'Direct Control', influence: 10 },
  { id: 'ev13', rulerId: 'darius_i', regionId: 'azerbaijan', startDate: -522, endDate: -486, status: 'Direct Control', influence: 10 },
  { id: 'ev14', rulerId: 'darius_i', regionId: 'caucasus', startDate: -522, endDate: -486, status: 'Direct Control', influence: 8 },
  { id: 'ev15', rulerId: 'darius_i', regionId: 'caspian_coast', startDate: -522, endDate: -486, status: 'Direct Control', influence: 9 },
  { id: 'ev16', rulerId: 'darius_i', regionId: 'khorasan', startDate: -522, endDate: -486, status: 'Direct Control', influence: 9 },
  { id: 'ev17', rulerId: 'darius_i', regionId: 'sistan', startDate: -522, endDate: -486, status: 'Direct Control', influence: 8 },
  { id: 'ev18', rulerId: 'darius_i', regionId: 'makran', startDate: -522, endDate: -486, status: 'Direct Control', influence: 7 },
  { id: 'ev19', rulerId: 'darius_i', regionId: 'transoxiana', startDate: -522, endDate: -486, status: 'Direct Control', influence: 7 },
  { id: 'ev20', rulerId: 'darius_i', regionId: 'chorasmia', startDate: -522, endDate: -486, status: 'Vassal State', influence: 5 },

  // ═══════════════════════════════════════════════════════════════════
  // PARTHIAN
  // ═══════════════════════════════════════════════════════════════════

  // Mithridates I (171–132 BC)
  { id: 'ev21', rulerId: 'mithridates_i', regionId: 'fars', startDate: -171, endDate: -132, status: 'Direct Control', influence: 8 },
  { id: 'ev22', rulerId: 'mithridates_i', regionId: 'jibal', startDate: -171, endDate: -132, status: 'Direct Control', influence: 9 },
  { id: 'ev23', rulerId: 'mithridates_i', regionId: 'khuzestan', startDate: -171, endDate: -132, status: 'Direct Control', influence: 8 },
  { id: 'ev24', rulerId: 'mithridates_i', regionId: 'mesopotamia', startDate: -141, endDate: -132, status: 'Direct Control', influence: 9 },
  { id: 'ev25', rulerId: 'mithridates_i', regionId: 'khorasan', startDate: -171, endDate: -132, status: 'Direct Control', influence: 10 },
  { id: 'ev26', rulerId: 'mithridates_i', regionId: 'caspian_coast', startDate: -171, endDate: -132, status: 'Direct Control', influence: 7 },

  // Orodes II (57–37 BC)
  { id: 'ev27', rulerId: 'orodes_ii', regionId: 'fars', startDate: -57, endDate: -37, status: 'Direct Control', influence: 9 },
  { id: 'ev28', rulerId: 'orodes_ii', regionId: 'jibal', startDate: -57, endDate: -37, status: 'Direct Control', influence: 9 },
  { id: 'ev29', rulerId: 'orodes_ii', regionId: 'khuzestan', startDate: -57, endDate: -37, status: 'Direct Control', influence: 9 },
  { id: 'ev30', rulerId: 'orodes_ii', regionId: 'mesopotamia', startDate: -57, endDate: -37, status: 'Direct Control', influence: 10 },
  { id: 'ev31', rulerId: 'orodes_ii', regionId: 'khorasan', startDate: -57, endDate: -37, status: 'Direct Control', influence: 8 },
  { id: 'ev32', rulerId: 'orodes_ii', regionId: 'azerbaijan', startDate: -57, endDate: -37, status: 'Direct Control', influence: 8 },
  { id: 'ev33', rulerId: 'orodes_ii', regionId: 'caspian_coast', startDate: -57, endDate: -37, status: 'Direct Control', influence: 7 },

  // ═══════════════════════════════════════════════════════════════════
  // SASANIAN
  // ═══════════════════════════════════════════════════════════════════

  // Ardashir I (224–242)
  { id: 'ev34', rulerId: 'ardashir_i', regionId: 'fars', startDate: 224, endDate: 242, status: 'Direct Control', influence: 10 },
  { id: 'ev35', rulerId: 'ardashir_i', regionId: 'jibal', startDate: 224, endDate: 242, status: 'Direct Control', influence: 9 },
  { id: 'ev36', rulerId: 'ardashir_i', regionId: 'khuzestan', startDate: 224, endDate: 242, status: 'Direct Control', influence: 10 },
  { id: 'ev37', rulerId: 'ardashir_i', regionId: 'mesopotamia', startDate: 224, endDate: 242, status: 'Direct Control', influence: 9 },
  { id: 'ev38', rulerId: 'ardashir_i', regionId: 'khorasan', startDate: 224, endDate: 242, status: 'Direct Control', influence: 8 },
  { id: 'ev39', rulerId: 'ardashir_i', regionId: 'azerbaijan', startDate: 224, endDate: 242, status: 'Direct Control', influence: 8 },
  { id: 'ev40', rulerId: 'ardashir_i', regionId: 'caspian_coast', startDate: 224, endDate: 242, status: 'Partial Control', influence: 6 },

  // Khosrow I (531–579) — peak Sasanian
  { id: 'ev41', rulerId: 'khosrow_i', regionId: 'fars', startDate: 531, endDate: 579, status: 'Direct Control', influence: 10 },
  { id: 'ev42', rulerId: 'khosrow_i', regionId: 'jibal', startDate: 531, endDate: 579, status: 'Direct Control', influence: 10 },
  { id: 'ev43', rulerId: 'khosrow_i', regionId: 'khuzestan', startDate: 531, endDate: 579, status: 'Direct Control', influence: 10 },
  { id: 'ev44', rulerId: 'khosrow_i', regionId: 'mesopotamia', startDate: 531, endDate: 579, status: 'Direct Control', influence: 10 },
  { id: 'ev45', rulerId: 'khosrow_i', regionId: 'azerbaijan', startDate: 531, endDate: 579, status: 'Direct Control', influence: 10 },
  { id: 'ev46', rulerId: 'khosrow_i', regionId: 'caucasus', startDate: 531, endDate: 579, status: 'Direct Control', influence: 8 },
  { id: 'ev47', rulerId: 'khosrow_i', regionId: 'caspian_coast', startDate: 531, endDate: 579, status: 'Direct Control', influence: 9 },
  { id: 'ev48', rulerId: 'khosrow_i', regionId: 'khorasan', startDate: 531, endDate: 579, status: 'Direct Control', influence: 9 },
  { id: 'ev49', rulerId: 'khosrow_i', regionId: 'sistan', startDate: 531, endDate: 579, status: 'Direct Control', influence: 8 },
  { id: 'ev50', rulerId: 'khosrow_i', regionId: 'makran', startDate: 531, endDate: 579, status: 'Partial Control', influence: 5 },
  { id: 'ev51', rulerId: 'khosrow_i', regionId: 'transoxiana', startDate: 531, endDate: 579, status: 'Partial Control', influence: 5 },
  { id: 'ev52', rulerId: 'khosrow_i', regionId: 'chorasmia', startDate: 531, endDate: 579, status: 'Vassal State', influence: 5 },

  // ═══════════════════════════════════════════════════════════════════
  // UMAYYAD CALIPHATE
  // ═══════════════════════════════════════════════════════════════════

  // Abd al-Malik (685–705)
  { id: 'ev53', rulerId: 'abd_al_malik', regionId: 'fars', startDate: 685, endDate: 705, status: 'Direct Control', influence: 9 },
  { id: 'ev54', rulerId: 'abd_al_malik', regionId: 'jibal', startDate: 685, endDate: 705, status: 'Direct Control', influence: 9 },
  { id: 'ev55', rulerId: 'abd_al_malik', regionId: 'khuzestan', startDate: 685, endDate: 705, status: 'Direct Control', influence: 10 },
  { id: 'ev56', rulerId: 'abd_al_malik', regionId: 'mesopotamia', startDate: 685, endDate: 705, status: 'Direct Control', influence: 10 },
  { id: 'ev57', rulerId: 'abd_al_malik', regionId: 'azerbaijan', startDate: 685, endDate: 705, status: 'Direct Control', influence: 8 },
  { id: 'ev58', rulerId: 'abd_al_malik', regionId: 'caucasus', startDate: 685, endDate: 705, status: 'Partial Control', influence: 5 },
  { id: 'ev59', rulerId: 'abd_al_malik', regionId: 'caspian_coast', startDate: 685, endDate: 705, status: 'Partial Control', influence: 4 },
  { id: 'ev60', rulerId: 'abd_al_malik', regionId: 'khorasan', startDate: 685, endDate: 705, status: 'Direct Control', influence: 8 },
  { id: 'ev61', rulerId: 'abd_al_malik', regionId: 'sistan', startDate: 685, endDate: 705, status: 'Direct Control', influence: 7 },
  { id: 'ev62', rulerId: 'abd_al_malik', regionId: 'makran', startDate: 685, endDate: 705, status: 'Partial Control', influence: 4 },
  { id: 'ev63', rulerId: 'abd_al_malik', regionId: 'transoxiana', startDate: 685, endDate: 705, status: 'Contested/Warzone', influence: 4 },

  // ═══════════════════════════════════════════════════════════════════
  // ABBASID CALIPHATE
  // ═══════════════════════════════════════════════════════════════════

  // Harun al-Rashid (786–809)
  { id: 'ev64', rulerId: 'harun_al_rashid', regionId: 'fars', startDate: 786, endDate: 809, status: 'Direct Control', influence: 9 },
  { id: 'ev65', rulerId: 'harun_al_rashid', regionId: 'jibal', startDate: 786, endDate: 809, status: 'Direct Control', influence: 9 },
  { id: 'ev66', rulerId: 'harun_al_rashid', regionId: 'khuzestan', startDate: 786, endDate: 809, status: 'Direct Control', influence: 10 },
  { id: 'ev67', rulerId: 'harun_al_rashid', regionId: 'mesopotamia', startDate: 786, endDate: 809, status: 'Direct Control', influence: 10 },
  { id: 'ev68', rulerId: 'harun_al_rashid', regionId: 'azerbaijan', startDate: 786, endDate: 809, status: 'Direct Control', influence: 8 },
  { id: 'ev69', rulerId: 'harun_al_rashid', regionId: 'caspian_coast', startDate: 786, endDate: 809, status: 'Partial Control', influence: 5 },
  { id: 'ev70', rulerId: 'harun_al_rashid', regionId: 'khorasan', startDate: 786, endDate: 809, status: 'Direct Control', influence: 8 },
  { id: 'ev71', rulerId: 'harun_al_rashid', regionId: 'sistan', startDate: 786, endDate: 809, status: 'Direct Control', influence: 7 },
  { id: 'ev72', rulerId: 'harun_al_rashid', regionId: 'transoxiana', startDate: 786, endDate: 809, status: 'Vassal State', influence: 6 },

  // ═══════════════════════════════════════════════════════════════════
  // SAMANID (Eastern Iranian revival)
  // ═══════════════════════════════════════════════════════════════════

  // Ismail Samani (892–907)
  { id: 'ev73', rulerId: 'ismail_samani', regionId: 'khorasan', startDate: 892, endDate: 907, status: 'Direct Control', influence: 10 },
  { id: 'ev74', rulerId: 'ismail_samani', regionId: 'transoxiana', startDate: 892, endDate: 907, status: 'Direct Control', influence: 10 },
  { id: 'ev75', rulerId: 'ismail_samani', regionId: 'sistan', startDate: 892, endDate: 907, status: 'Direct Control', influence: 7 },
  { id: 'ev76', rulerId: 'ismail_samani', regionId: 'chorasmia', startDate: 892, endDate: 907, status: 'Vassal State', influence: 6 },
  { id: 'ev77', rulerId: 'ismail_samani', regionId: 'caspian_coast', startDate: 892, endDate: 907, status: 'Partial Control', influence: 4 },

  // ═══════════════════════════════════════════════════════════════════
  // BUYID (Western Iranian)
  // ═══════════════════════════════════════════════════════════════════

  // Adud al-Dawla (949–983)
  { id: 'ev78', rulerId: 'adud_al_dawla', regionId: 'fars', startDate: 949, endDate: 983, status: 'Direct Control', influence: 10 },
  { id: 'ev79', rulerId: 'adud_al_dawla', regionId: 'jibal', startDate: 949, endDate: 983, status: 'Direct Control', influence: 9 },
  { id: 'ev80', rulerId: 'adud_al_dawla', regionId: 'khuzestan', startDate: 949, endDate: 983, status: 'Direct Control', influence: 10 },
  { id: 'ev81', rulerId: 'adud_al_dawla', regionId: 'mesopotamia', startDate: 949, endDate: 983, status: 'Direct Control', influence: 9 },
  { id: 'ev82', rulerId: 'adud_al_dawla', regionId: 'caspian_coast', startDate: 949, endDate: 983, status: 'Direct Control', influence: 8 },
  { id: 'ev83', rulerId: 'adud_al_dawla', regionId: 'makran', startDate: 949, endDate: 983, status: 'Partial Control', influence: 5 },

  // ═══════════════════════════════════════════════════════════════════
  // SELJUK
  // ═══════════════════════════════════════════════════════════════════

  // Alp Arslan (1063–1072)
  { id: 'ev84', rulerId: 'alp_arslan', regionId: 'fars', startDate: 1063, endDate: 1072, status: 'Direct Control', influence: 8 },
  { id: 'ev85', rulerId: 'alp_arslan', regionId: 'jibal', startDate: 1063, endDate: 1072, status: 'Direct Control', influence: 10 },
  { id: 'ev86', rulerId: 'alp_arslan', regionId: 'khuzestan', startDate: 1063, endDate: 1072, status: 'Direct Control', influence: 8 },
  { id: 'ev87', rulerId: 'alp_arslan', regionId: 'mesopotamia', startDate: 1063, endDate: 1072, status: 'Direct Control', influence: 9 },
  { id: 'ev88', rulerId: 'alp_arslan', regionId: 'azerbaijan', startDate: 1063, endDate: 1072, status: 'Direct Control', influence: 9 },
  { id: 'ev89', rulerId: 'alp_arslan', regionId: 'caucasus', startDate: 1063, endDate: 1072, status: 'Partial Control', influence: 5 },
  { id: 'ev90', rulerId: 'alp_arslan', regionId: 'caspian_coast', startDate: 1063, endDate: 1072, status: 'Partial Control', influence: 5 },
  { id: 'ev91', rulerId: 'alp_arslan', regionId: 'khorasan', startDate: 1063, endDate: 1072, status: 'Direct Control', influence: 10 },
  { id: 'ev92', rulerId: 'alp_arslan', regionId: 'transoxiana', startDate: 1063, endDate: 1072, status: 'Direct Control', influence: 7 },

  // Malik-Shah I (1072–1092) — peak Seljuk
  { id: 'ev93', rulerId: 'malik_shah_i', regionId: 'fars', startDate: 1072, endDate: 1092, status: 'Direct Control', influence: 9 },
  { id: 'ev94', rulerId: 'malik_shah_i', regionId: 'jibal', startDate: 1072, endDate: 1092, status: 'Direct Control', influence: 10 },
  { id: 'ev95', rulerId: 'malik_shah_i', regionId: 'khuzestan', startDate: 1072, endDate: 1092, status: 'Direct Control', influence: 9 },
  { id: 'ev96', rulerId: 'malik_shah_i', regionId: 'mesopotamia', startDate: 1072, endDate: 1092, status: 'Direct Control', influence: 10 },
  { id: 'ev97', rulerId: 'malik_shah_i', regionId: 'azerbaijan', startDate: 1072, endDate: 1092, status: 'Direct Control', influence: 9 },
  { id: 'ev98', rulerId: 'malik_shah_i', regionId: 'caucasus', startDate: 1072, endDate: 1092, status: 'Partial Control', influence: 5 },
  { id: 'ev99', rulerId: 'malik_shah_i', regionId: 'caspian_coast', startDate: 1072, endDate: 1092, status: 'Partial Control', influence: 5 },
  { id: 'ev100', rulerId: 'malik_shah_i', regionId: 'khorasan', startDate: 1072, endDate: 1092, status: 'Direct Control', influence: 10 },
  { id: 'ev101', rulerId: 'malik_shah_i', regionId: 'sistan', startDate: 1072, endDate: 1092, status: 'Vassal State', influence: 5 },
  { id: 'ev102', rulerId: 'malik_shah_i', regionId: 'transoxiana', startDate: 1072, endDate: 1092, status: 'Direct Control', influence: 8 },
  { id: 'ev103', rulerId: 'malik_shah_i', regionId: 'chorasmia', startDate: 1072, endDate: 1092, status: 'Vassal State', influence: 6 },

  // ═══════════════════════════════════════════════════════════════════
  // KHWARAZMIAN
  // ═══════════════════════════════════════════════════════════════════

  // Muhammad II (1200–1220)
  { id: 'ev104', rulerId: 'muhammad_ii', regionId: 'khorasan', startDate: 1200, endDate: 1220, status: 'Direct Control', influence: 10 },
  { id: 'ev105', rulerId: 'muhammad_ii', regionId: 'transoxiana', startDate: 1200, endDate: 1220, status: 'Direct Control', influence: 10 },
  { id: 'ev106', rulerId: 'muhammad_ii', regionId: 'chorasmia', startDate: 1200, endDate: 1220, status: 'Direct Control', influence: 10 },
  { id: 'ev107', rulerId: 'muhammad_ii', regionId: 'jibal', startDate: 1200, endDate: 1220, status: 'Direct Control', influence: 8 },
  { id: 'ev108', rulerId: 'muhammad_ii', regionId: 'fars', startDate: 1200, endDate: 1220, status: 'Direct Control', influence: 7 },
  { id: 'ev109', rulerId: 'muhammad_ii', regionId: 'sistan', startDate: 1200, endDate: 1220, status: 'Direct Control', influence: 7 },
  { id: 'ev110', rulerId: 'muhammad_ii', regionId: 'khuzestan', startDate: 1200, endDate: 1220, status: 'Partial Control', influence: 5 },

  // ═══════════════════════════════════════════════════════════════════
  // ILKHANATE
  // ═══════════════════════════════════════════════════════════════════

  // Ghazan (1295–1304)
  { id: 'ev111', rulerId: 'ghazan', regionId: 'azerbaijan', startDate: 1295, endDate: 1304, status: 'Direct Control', influence: 10 },
  { id: 'ev112', rulerId: 'ghazan', regionId: 'jibal', startDate: 1295, endDate: 1304, status: 'Direct Control', influence: 10 },
  { id: 'ev113', rulerId: 'ghazan', regionId: 'fars', startDate: 1295, endDate: 1304, status: 'Direct Control', influence: 9 },
  { id: 'ev114', rulerId: 'ghazan', regionId: 'khuzestan', startDate: 1295, endDate: 1304, status: 'Direct Control', influence: 8 },
  { id: 'ev115', rulerId: 'ghazan', regionId: 'mesopotamia', startDate: 1295, endDate: 1304, status: 'Direct Control', influence: 9 },
  { id: 'ev116', rulerId: 'ghazan', regionId: 'khorasan', startDate: 1295, endDate: 1304, status: 'Direct Control', influence: 8 },
  { id: 'ev117', rulerId: 'ghazan', regionId: 'caspian_coast', startDate: 1295, endDate: 1304, status: 'Direct Control', influence: 7 },
  { id: 'ev118', rulerId: 'ghazan', regionId: 'caucasus', startDate: 1295, endDate: 1304, status: 'Partial Control', influence: 6 },

  // ═══════════════════════════════════════════════════════════════════
  // CONTESTED POST-ILKHANID (1340s–1350s)
  // ═══════════════════════════════════════════════════════════════════

  // Muzaffarid
  { id: 'ev119', rulerId: 'mubariz_al_din', regionId: 'fars', startDate: 1314, endDate: 1358, status: 'Direct Control', influence: 9 },
  { id: 'ev120', rulerId: 'mubariz_al_din', regionId: 'khuzestan', startDate: 1340, endDate: 1358, status: 'Partial Control', influence: 5 },
  { id: 'ev121', rulerId: 'mubariz_al_din', regionId: 'jibal', startDate: 1340, endDate: 1358, status: 'Contested/Warzone', influence: 6 },

  // Jalayirid
  { id: 'ev122', rulerId: 'hasan_buzurg', regionId: 'mesopotamia', startDate: 1336, endDate: 1356, status: 'Direct Control', influence: 9 },
  { id: 'ev123', rulerId: 'hasan_buzurg', regionId: 'azerbaijan', startDate: 1336, endDate: 1356, status: 'Direct Control', influence: 9 },
  { id: 'ev124', rulerId: 'hasan_buzurg', regionId: 'jibal', startDate: 1336, endDate: 1356, status: 'Contested/Warzone', influence: 5 },

  // ═══════════════════════════════════════════════════════════════════
  // TIMURID
  // ═══════════════════════════════════════════════════════════════════

  // Timur (1370–1405)
  { id: 'ev125', rulerId: 'timur', regionId: 'transoxiana', startDate: 1370, endDate: 1405, status: 'Direct Control', influence: 10 },
  { id: 'ev126', rulerId: 'timur', regionId: 'khorasan', startDate: 1370, endDate: 1405, status: 'Direct Control', influence: 10 },
  { id: 'ev127', rulerId: 'timur', regionId: 'fars', startDate: 1387, endDate: 1405, status: 'Direct Control', influence: 9 },
  { id: 'ev128', rulerId: 'timur', regionId: 'jibal', startDate: 1387, endDate: 1405, status: 'Direct Control', influence: 9 },
  { id: 'ev129', rulerId: 'timur', regionId: 'khuzestan', startDate: 1393, endDate: 1405, status: 'Direct Control', influence: 7 },
  { id: 'ev130', rulerId: 'timur', regionId: 'mesopotamia', startDate: 1393, endDate: 1405, status: 'Direct Control', influence: 8 },
  { id: 'ev131', rulerId: 'timur', regionId: 'azerbaijan', startDate: 1386, endDate: 1405, status: 'Direct Control', influence: 9 },
  { id: 'ev132', rulerId: 'timur', regionId: 'caucasus', startDate: 1386, endDate: 1405, status: 'Direct Control', influence: 7 },
  { id: 'ev133', rulerId: 'timur', regionId: 'caspian_coast', startDate: 1392, endDate: 1405, status: 'Partial Control', influence: 5 },
  { id: 'ev134', rulerId: 'timur', regionId: 'sistan', startDate: 1383, endDate: 1405, status: 'Direct Control', influence: 8 },
  { id: 'ev135', rulerId: 'timur', regionId: 'makran', startDate: 1393, endDate: 1405, status: 'Partial Control', influence: 5 },
  { id: 'ev136', rulerId: 'timur', regionId: 'chorasmia', startDate: 1370, endDate: 1405, status: 'Direct Control', influence: 8 },

  // Shah Rukh (1405–1447) — peaceful eastern half
  { id: 'ev137', rulerId: 'shah_rukh', regionId: 'khorasan', startDate: 1405, endDate: 1447, status: 'Direct Control', influence: 10 },
  { id: 'ev138', rulerId: 'shah_rukh', regionId: 'transoxiana', startDate: 1405, endDate: 1447, status: 'Direct Control', influence: 9 },
  { id: 'ev139', rulerId: 'shah_rukh', regionId: 'fars', startDate: 1405, endDate: 1447, status: 'Vassal State', influence: 6 },
  { id: 'ev140', rulerId: 'shah_rukh', regionId: 'jibal', startDate: 1405, endDate: 1447, status: 'Vassal State', influence: 5 },
  { id: 'ev141', rulerId: 'shah_rukh', regionId: 'sistan', startDate: 1405, endDate: 1447, status: 'Direct Control', influence: 7 },
  { id: 'ev142', rulerId: 'shah_rukh', regionId: 'chorasmia', startDate: 1405, endDate: 1447, status: 'Vassal State', influence: 5 },

  // ═══════════════════════════════════════════════════════════════════
  // SAFAVID
  // ═══════════════════════════════════════════════════════════════════

  // Ismail I (1501–1524) — reunification
  { id: 'ev143', rulerId: 'ismail_i', regionId: 'azerbaijan', startDate: 1501, endDate: 1524, status: 'Direct Control', influence: 10 },
  { id: 'ev144', rulerId: 'ismail_i', regionId: 'jibal', startDate: 1501, endDate: 1524, status: 'Direct Control', influence: 9 },
  { id: 'ev145', rulerId: 'ismail_i', regionId: 'fars', startDate: 1501, endDate: 1524, status: 'Direct Control', influence: 9 },
  { id: 'ev146', rulerId: 'ismail_i', regionId: 'khuzestan', startDate: 1501, endDate: 1524, status: 'Direct Control', influence: 8 },
  { id: 'ev147', rulerId: 'ismail_i', regionId: 'mesopotamia', startDate: 1508, endDate: 1524, status: 'Direct Control', influence: 8 },
  { id: 'ev148', rulerId: 'ismail_i', regionId: 'khorasan', startDate: 1510, endDate: 1524, status: 'Direct Control', influence: 8 },
  { id: 'ev149', rulerId: 'ismail_i', regionId: 'caspian_coast', startDate: 1501, endDate: 1524, status: 'Direct Control', influence: 8 },

  // Abbas I (1588–1629) — peak Safavid
  { id: 'ev150', rulerId: 'abbas_i', regionId: 'jibal', startDate: 1588, endDate: 1629, status: 'Direct Control', influence: 10 },
  { id: 'ev151', rulerId: 'abbas_i', regionId: 'fars', startDate: 1588, endDate: 1629, status: 'Direct Control', influence: 10 },
  { id: 'ev152', rulerId: 'abbas_i', regionId: 'azerbaijan', startDate: 1603, endDate: 1629, status: 'Direct Control', influence: 10 },
  { id: 'ev153', rulerId: 'abbas_i', regionId: 'khuzestan', startDate: 1588, endDate: 1629, status: 'Direct Control', influence: 9 },
  { id: 'ev154', rulerId: 'abbas_i', regionId: 'khorasan', startDate: 1598, endDate: 1629, status: 'Direct Control', influence: 9 },
  { id: 'ev155', rulerId: 'abbas_i', regionId: 'caspian_coast', startDate: 1588, endDate: 1629, status: 'Direct Control', influence: 9 },
  { id: 'ev156', rulerId: 'abbas_i', regionId: 'caucasus', startDate: 1603, endDate: 1629, status: 'Direct Control', influence: 7 },
  { id: 'ev157', rulerId: 'abbas_i', regionId: 'sistan', startDate: 1588, endDate: 1629, status: 'Vassal State', influence: 5 },
  { id: 'ev158', rulerId: 'abbas_i', regionId: 'mesopotamia', startDate: 1623, endDate: 1629, status: 'Contested/Warzone', influence: 5 },

  // ═══════════════════════════════════════════════════════════════════
  // AFSHARID
  // ═══════════════════════════════════════════════════════════════════

  // Nader Shah (1736–1747) — maximum modern extent
  { id: 'ev159', rulerId: 'nader_shah', regionId: 'fars', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 10 },
  { id: 'ev160', rulerId: 'nader_shah', regionId: 'jibal', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 10 },
  { id: 'ev161', rulerId: 'nader_shah', regionId: 'khuzestan', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 9 },
  { id: 'ev162', rulerId: 'nader_shah', regionId: 'mesopotamia', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 8 },
  { id: 'ev163', rulerId: 'nader_shah', regionId: 'azerbaijan', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 10 },
  { id: 'ev164', rulerId: 'nader_shah', regionId: 'caucasus', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 8 },
  { id: 'ev165', rulerId: 'nader_shah', regionId: 'caspian_coast', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 9 },
  { id: 'ev166', rulerId: 'nader_shah', regionId: 'khorasan', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 10 },
  { id: 'ev167', rulerId: 'nader_shah', regionId: 'sistan', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 8 },
  { id: 'ev168', rulerId: 'nader_shah', regionId: 'makran', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 7 },
  { id: 'ev169', rulerId: 'nader_shah', regionId: 'transoxiana', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 8 },
  { id: 'ev170', rulerId: 'nader_shah', regionId: 'chorasmia', startDate: 1736, endDate: 1747, status: 'Direct Control', influence: 7 },

  // ═══════════════════════════════════════════════════════════════════
  // ZAND
  // ═══════════════════════════════════════════════════════════════════

  // Karim Khan (1751–1779)
  { id: 'ev171', rulerId: 'karim_khan', regionId: 'fars', startDate: 1751, endDate: 1779, status: 'Direct Control', influence: 10 },
  { id: 'ev172', rulerId: 'karim_khan', regionId: 'jibal', startDate: 1751, endDate: 1779, status: 'Direct Control', influence: 9 },
  { id: 'ev173', rulerId: 'karim_khan', regionId: 'khuzestan', startDate: 1751, endDate: 1779, status: 'Direct Control', influence: 8 },
  { id: 'ev174', rulerId: 'karim_khan', regionId: 'mesopotamia', startDate: 1751, endDate: 1779, status: 'Direct Control', influence: 7 },
  { id: 'ev175', rulerId: 'karim_khan', regionId: 'azerbaijan', startDate: 1751, endDate: 1779, status: 'Vassal State', influence: 5 },
  { id: 'ev176', rulerId: 'karim_khan', regionId: 'caspian_coast', startDate: 1751, endDate: 1779, status: 'Partial Control', influence: 5 },

  // ═══════════════════════════════════════════════════════════════════
  // QAJAR
  // ═══════════════════════════════════════════════════════════════════

  // Agha Mohammad Khan (1789–1797 — reunification)
  { id: 'ev177', rulerId: 'agha_mohammad_khan', regionId: 'jibal', startDate: 1789, endDate: 1797, status: 'Direct Control', influence: 10 },
  { id: 'ev178', rulerId: 'agha_mohammad_khan', regionId: 'fars', startDate: 1789, endDate: 1797, status: 'Direct Control', influence: 9 },
  { id: 'ev179', rulerId: 'agha_mohammad_khan', regionId: 'khuzestan', startDate: 1789, endDate: 1797, status: 'Direct Control', influence: 8 },
  { id: 'ev180', rulerId: 'agha_mohammad_khan', regionId: 'azerbaijan', startDate: 1789, endDate: 1797, status: 'Direct Control', influence: 9 },
  { id: 'ev181', rulerId: 'agha_mohammad_khan', regionId: 'khorasan', startDate: 1789, endDate: 1797, status: 'Direct Control', influence: 8 },
  { id: 'ev182', rulerId: 'agha_mohammad_khan', regionId: 'caucasus', startDate: 1789, endDate: 1797, status: 'Direct Control', influence: 8 },
  { id: 'ev183', rulerId: 'agha_mohammad_khan', regionId: 'caspian_coast', startDate: 1789, endDate: 1797, status: 'Direct Control', influence: 9 },

  // Naser al-Din Shah (1848–1896 — post-Russian treaty losses)
  { id: 'ev184', rulerId: 'naser_al_din_shah', regionId: 'jibal', startDate: 1848, endDate: 1896, status: 'Direct Control', influence: 10 },
  { id: 'ev185', rulerId: 'naser_al_din_shah', regionId: 'fars', startDate: 1848, endDate: 1896, status: 'Direct Control', influence: 9 },
  { id: 'ev186', rulerId: 'naser_al_din_shah', regionId: 'khuzestan', startDate: 1848, endDate: 1896, status: 'Direct Control', influence: 8 },
  { id: 'ev187', rulerId: 'naser_al_din_shah', regionId: 'azerbaijan', startDate: 1848, endDate: 1896, status: 'Direct Control', influence: 8 },
  { id: 'ev188', rulerId: 'naser_al_din_shah', regionId: 'khorasan', startDate: 1848, endDate: 1896, status: 'Direct Control', influence: 7 },
  { id: 'ev189', rulerId: 'naser_al_din_shah', regionId: 'caspian_coast', startDate: 1848, endDate: 1896, status: 'Direct Control', influence: 8 },
  { id: 'ev190', rulerId: 'naser_al_din_shah', regionId: 'sistan', startDate: 1848, endDate: 1896, status: 'Partial Control', influence: 5 },
  { id: 'ev191', rulerId: 'naser_al_din_shah', regionId: 'makran', startDate: 1848, endDate: 1896, status: 'Partial Control', influence: 4 },

  // ═══════════════════════════════════════════════════════════════════
  // PAHLAVI
  // ═══════════════════════════════════════════════════════════════════

  // Reza Shah (1925–1941) — modern centralized nation-state
  // Core Iranian territory (modern borders) = full control
  { id: 'ev192', rulerId: 'reza_shah', regionId: 'jibal', startDate: 1925, endDate: 1941, status: 'Direct Control', influence: 10 },
  { id: 'ev193', rulerId: 'reza_shah', regionId: 'fars', startDate: 1925, endDate: 1941, status: 'Direct Control', influence: 10 },
  { id: 'ev194', rulerId: 'reza_shah', regionId: 'khuzestan', startDate: 1925, endDate: 1941, status: 'Direct Control', influence: 9 },
  { id: 'ev195', rulerId: 'reza_shah', regionId: 'azerbaijan', startDate: 1925, endDate: 1941, status: 'Direct Control', influence: 9 },
  { id: 'ev196', rulerId: 'reza_shah', regionId: 'caspian_coast', startDate: 1925, endDate: 1941, status: 'Direct Control', influence: 9 },
  // Regions extending beyond modern Iran = partial (western Khorasan, Zabol area, Chabahar coast)
  { id: 'ev197', rulerId: 'reza_shah', regionId: 'khorasan', startDate: 1925, endDate: 1941, status: 'Partial Control', influence: 6 },
  { id: 'ev198', rulerId: 'reza_shah', regionId: 'sistan', startDate: 1925, endDate: 1941, status: 'Partial Control', influence: 5 },
  { id: 'ev199', rulerId: 'reza_shah', regionId: 'makran', startDate: 1925, endDate: 1941, status: 'Partial Control', influence: 5 },

  // Mohammad Reza Shah (1941–1979)
  { id: 'ev200', rulerId: 'mohammad_reza_shah', regionId: 'jibal', startDate: 1941, endDate: 1979, status: 'Direct Control', influence: 10 },
  { id: 'ev201', rulerId: 'mohammad_reza_shah', regionId: 'fars', startDate: 1941, endDate: 1979, status: 'Direct Control', influence: 10 },
  { id: 'ev202', rulerId: 'mohammad_reza_shah', regionId: 'khuzestan', startDate: 1941, endDate: 1979, status: 'Direct Control', influence: 10 },
  { id: 'ev203', rulerId: 'mohammad_reza_shah', regionId: 'azerbaijan', startDate: 1941, endDate: 1979, status: 'Direct Control', influence: 9 },
  { id: 'ev204', rulerId: 'mohammad_reza_shah', regionId: 'caspian_coast', startDate: 1941, endDate: 1979, status: 'Direct Control', influence: 10 },
  // Regions extending beyond modern Iran = partial (western Khorasan, Zabol area, Chabahar coast)
  { id: 'ev205', rulerId: 'mohammad_reza_shah', regionId: 'khorasan', startDate: 1941, endDate: 1979, status: 'Partial Control', influence: 7 },
  { id: 'ev206', rulerId: 'mohammad_reza_shah', regionId: 'sistan', startDate: 1941, endDate: 1979, status: 'Partial Control', influence: 5 },
  { id: 'ev207', rulerId: 'mohammad_reza_shah', regionId: 'makran', startDate: 1941, endDate: 1979, status: 'Partial Control', influence: 5 }
];
