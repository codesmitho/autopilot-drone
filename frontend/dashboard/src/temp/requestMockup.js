const mockData = [
    {
      _id: "607c72efc8b6fbb4c8f5298b",
      uuid: "abc123-uuid",
      title: "Car Collision",
      description: "คำขอเกี่ยวกับอุบัติเหตุทางถนนที่มีผู้ได้รับบาดเจ็บหลายราย",
      person_affected: 5,
      location: {
        latitude: 13.7563,
        longitude: 100.5018,
        address: "กรุงเทพมหานคร, ประเทศไทย"
      },
      request_type: ["Scout", "Navigation"],
      review_by: null,
      review_at: null,
      status: "Pending",
      task_case_uuid: null,
      reject_reason: null,
      create_at: "2024-12-19T09:00:00",
      update_at: null
    },
    {
      _id: "607c72efc8b6fbb4c8f5298c",
      uuid: "def456-uuid",
      title: "กรณีเกี่ยวกับเหตุเพลิงไหม้",
      description: "เหตุการณ์เพลิงไหม้ที่ทำให้เกิดความเสียหายต่อทรัพย์สินจำนวนมาก",
      person_affected: 10,
      location: {
        latitude: 13.7748,
        longitude: 100.5845,
        address: "บางแค, กรุงเทพมหานคร, ประเทศไทย"
      },
      request_type: ["Scout"],
      review_by: null,
      review_at: null,
      status: "Pending",
      task_case_uuid: null,
      reject_reason: null,
      create_at: "2024-12-18T08:00:00",
      update_at: null
    },
    {
      _id: "607c72efc8b6fbb4c8f5298d",
      uuid: "ghi789-uuid",
      title: "กรณีเกี่ยวกับการขนส่งเครื่อง AED",
      description: "คำขอเกี่ยวกับการขนส่งการขนส่งเครื่อง AED",
      person_affected: 3,
      location: {
        latitude: 13.7597,
        longitude: 100.5784,
        address: "บางพลัด, กรุงเทพมหานคร, ประเทศไทย"
      },
      request_type: ["Delivery"],
      review_by: null,
      review_at: null,
      status: "Pending",
      task_case_uuid: null,
      reject_reason: null,
      create_at: "2024-12-17T13:00:00",
      update_at: null
    }
  ];
  
  export default mockData;
  