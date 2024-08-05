import axios from "axios";

export async function GetAll() {
  try {
    const response = await axios.get('https://localhost:7192/outfit-management/outfits', {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log("Response data:", response.data);

    return response.data; // Trả về dữ liệu nhận được
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Ném lỗi để có thể xử lý bên ngoài
  }
}
