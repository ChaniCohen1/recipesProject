import axios from "axios";

const url = "https://recipes-project-omega.vercel.app";
// https://recipes-project-omega.vercel.app
// http://localhost:3000

export async function fetchProtectedData() {
  try {
    const response = await axios.get(`${url}/api/login`, {
      withCredentials: true, //אישור שליחת עוגיות לשרת
    });

    const data = response.data;

    console.log("מידע מוגן:", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("שגיאה:", error.response.data.message);
    } else {
      console.log("שגיאה כלשהי:", error);
    }
    return null;
  }
};

export async function loginAxiosForGetToken(email: string, password: string) {
  try {
    console.log(email, password);
    
    // שליחת הבקשה לשרת עם נתוני הלוגין
    const response = await axios.post(`${url}/api/login`, {
      email,
      password,
    });
    console.log("response", response);
    

    if (response.data.token) {
      return true;
    }
  } catch (err) {
    console.log(err);

    return false;
  }
};
