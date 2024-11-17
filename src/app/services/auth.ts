import axios from "axios";

export async function fetchProtectedData() {
  try {
    const response = await axios.get("http://localhost:3000/api/login", {
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
    const response = await axios.post("http://localhost:3000/api/login", {
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
