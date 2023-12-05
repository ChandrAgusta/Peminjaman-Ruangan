import axios from "axios";
// import socketIOClient from 'socket.io-client';

export const API_URL = "http://localhost:4000";
// const socket = socketIOClient(API_URL);

// RUANGAN
// Fungsi untuk melakukan GET request
export const getRuanganData = async () => {
  try {
    const response = await axios.get(`${API_URL}/ruangan`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan POST request
export const postRuanganData = async (ruanganData) => {
  try {
    const response = await axios.post(`${API_URL}/ruangan`, ruanganData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan PUT request
export const putRuanganData = async (id, ruanganData) => {
  try {
    const response = await axios.put(`${API_URL}/ruangan/${id}`, ruanganData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan DELETE request
export const deleteRuanganData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/ruangan/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//USER 
// Fungsi untuk melakukan GET request data pengguna
export const getPenggunaData = async () => {
  try {
    const response = await axios.get(`${API_URL}/pengguna`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan POST request data pengguna
export const postPenggunaData = async (penggunaData) => {
  try {
    const response = await axios.post(`${API_URL}/pengguna`, penggunaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan PUT request data pengguna
export const putPenggunaData = async (id, penggunaData) => {
  try {
    const response = await axios.put(`${API_URL}/pengguna/${id}`, penggunaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan DELETE request data pengguna
export const deletePenggunaData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/pengguna/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// SEKRETARIAT
// Fungsi untuk melakukan GET request data sekretariat
export const getSekretariatData = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/sekretariat`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan POST request data pengguna
export const postSekretariatData = async (penggunaData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/sekretariat`, penggunaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan PUT request data pengguna
export const getSekretariatDataId = async (id, penggunaData) => {
  try {
    const response = await axios.get(`${API_URL}/auth/sekretariat/${id}`, penggunaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan DELETE request data pengguna
export const deleteSekretariatData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/auth/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// FASILITAS
// Fungsi untuk melakukan GET request data 
export const getFasilitasData = async (id_ruangan) => {
  try {
    const response = await axios.get(`${API_URL}/barang?ruanganId=${id_ruangan}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan POST request data 
export const postFasilitasData = async (fasilitasData) => {
  try {
    const response = await axios.post(`${API_URL}/barang`, fasilitasData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan PUT request data 
export const putFasilitasData = async (id, fasilitasData) => {
  try {
    const response = await axios.put(`${API_URL}/barang/${id}`, fasilitasData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan DELETE request data 
export const deleteFasilitasData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/barang/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// JAM
// Fungsi untuk melakukan GET request data peminjaman
export const getJamData = async (ruanganId) => {
  try {
    const response = await axios.get(`${API_URL}/jam/${ruanganId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan POST request data peminjaman
export const postJamData = async (id_ruangan, jamData) => {
  try {
    const response = await axios.post(`${API_URL}/jam/${id_ruangan}`, jamData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan PUT request data peminjaman
export const putJamData = async (id, jamData) => {
  try {
    const response = await axios.put(`${API_URL}/jam/${id}`, jamData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PEMINJAMAN
// Fungsi untuk melakukan GET request data peminjaman
export const getPeminjamanData = async () => {
  try {
    const response = await axios.get(`${API_URL}/peminjaman`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan POST request data peminjaman
export const postPeminjamanData = async (id_ruangan, peminjamanData) => {
  try {
    const response = await axios.post(`${API_URL}/peminjaman/${id_ruangan}`, peminjamanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan PUT request data peminjaman
export const putPeminjamanData = async (id, peminjamanData) => {
  try {
    const response = await axios.put(`${API_URL}/peminjaman/${id}`, peminjamanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk melakukan DELETE request data peminjaman
export const deletePeminjamanData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/peminjaman/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchRuangan = async (tanggal) => {
  try {
    const response = await axios.get(`${API_URL}/peminjaman/search`, {
      params: {
        tanggal: tanggal,
      },
    });
    return response.data.ruanganTersedia;
  } catch (error) {
    throw error;
  }
};

export const RiwayatPeminjaman = async () => {
  try {
    const response = await axios.get(`${API_URL}/peminjaman/riwayat`);
    return response.data.riwayat;
  } catch (error) {
    throw error;
  }
};


// LOGIN
// Fungsi untuk mendapatkan peran (role) pengguna berdasarkan ID
// Fungsi untuk melakukan POST request login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.userRole; // Ambil userRole dari profil pengguna
  } catch (error) {
    throw error;
  }
};

// export const loginUser = async (credentials) => {
//   try {
//     // Use your login API endpoint to authenticate
//     // and get the token
//     const response = await fetch(`${API_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };


// export const listenToDatabaseChanges = (callback) => {
//   socket.on('databaseUpdate', (updatedData) => {
//     callback(updatedData);
//   });
// };










