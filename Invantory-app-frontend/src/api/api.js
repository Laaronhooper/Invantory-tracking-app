import axios from "axios";

const signin = async (username, password, error) => {
  try {
    const { status, data } = await axios.post("/api/auth/sign_in", {
      username,
      password,
    });

    if (status === 200) {
      return data;
    } else {
      return error(error);
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const createUser = async (
  username,
  password,
  password_confirmation,
  admin,
  success,
  error
) => {
  try {
    const { status, data } = await axios.post("api/auth/sign_up", {
      username,
      password,
      password_confirmation,
      admin,
    });
    if (status === 201) {
      success(data.message, data.data);
    } else {
      return error(error);
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const getAlcohols = async () => {
  try {
    const { status, data } = await axios.get("/api/alcohols");
    if (status === 200) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createAlcohol = async (
  name,
  volume_in_ml,
  critical_volume,
  user_id,
  jwt,
  success,
  error
) => {
  try {
    const { status, data } = await axios.post(
      "/api/alcohols",
      {
        name: name,
        volume_in_ml: volume_in_ml,
        critical_volume: critical_volume,
        user_id: user_id,
      },
      { headers: { Authorization: jwt } }
    );
    if (status === 201) {
      success(data.message, data.data);
    } else {
      return null;
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const editAlcohol = async (
  id,
  name,
  volume_in_ml,
  critical_volume,
  user_id,
  jwt,
  success,
  error
) => {
  try {
    const { status, data } = await axios.put(
      `/api/alcohols/${id}`,
      { name, volume_in_ml, critical_volume, user_id },
      { headers: { Authorization: jwt } }
    );

    if (status === 200) {
      success(data.data, data.message);
    } else {
      return error(error);
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const deleteAlcohol = async (id, jwt, success, error) => {
  try {
    const { status, data } = await axios.delete(`/api/alcohols/${id}`, {
      headers: { Authorization: jwt },
    });
    if (status === 200) {
      success(data);
    } else {
      return error(error);
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const getMixers = async () => {
  try {
    const { status, data } = await axios.get("/api/mixers");
    if (status === 200) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createMixer = async (
  name,
  volume_in_ml,
  critical_volume,
  user_id,
  jwt,
  success,
  error
) => {
  try {
    const { status, data } = await axios.post(
      "/api/mixers",
      {
        name: name,
        volume_in_ml: volume_in_ml,
        critical_volume: critical_volume,
        user_id: user_id,
      },
      { headers: { Authorization: jwt } }
    );
    if (status === 201) {
      success(data.message, data.data);
    } else {
      return null;
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const editMixer = async (
  id,
  name,
  volume_in_ml,
  critical_volume,
  user_id,
  jwt,
  success,
  error
) => {
  try {
    const { status, data } = await axios.put(
      `/api/mixers/${id}`,
      { name, volume_in_ml, critical_volume, user_id },
      { headers: { Authorization: jwt } }
    );

    if (status === 200) {
      success(data.data, data.message);
    } else {
      return error(error);
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const deleteMixer = async (id, jwt, success, error) => {
  try {
    const { status, data } = await axios.delete(`/api/mixers/${id}`, {
      headers: { Authorization: jwt },
    });
    if (status === 200) {
      success(data);
    } else {
      error(error);
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const getDrinks = async () => {
  try {
    const { status, data } = await axios.get("/api/drinks");
    if (status === 200) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    // console.error(error);
    return null;
  }
};

const createDrink = async (
  name,
  alcohol_id,
  alcohol_amount,
  mixer_id,
  mixer_amount,
  user_id,
  jwt,
  success,
  error
) => {
  try {
    const { status, data } = await axios.post(
      "/api/drinks",
      {
        name: name,
        alcohol_id: alcohol_id,
        alcohol_amount: alcohol_amount,
        mixer_id: mixer_id,
        mixer_amount: mixer_amount,
        user_id: user_id,
      },
      { headers: { Authorization: jwt } }
    );
    if (status === 201) {
      success(data.message, data.data);
    } else {
      return null;
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const editDrink = async (
  id,
  name,
  alcohol_id,
  alcohol_amount,
  mixer_id,
  mixer_amount,
  user_id,
  number_sold,
  jwt,
  success,
  error
) => {
  try {
    const { status, data } = await axios.put(
      `/api/drinks/${id}`,
      {
        name,
        alcohol_id,
        alcohol_amount,
        mixer_id,
        mixer_amount,
        user_id,
        number_sold,
      },
      { headers: { Authorization: jwt } }
    );

    if (status === 200) {
      success(data.data, data.message);
    } else {
      return error(error);
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const deleteDrink = async (id, jwt, success, error) => {
  try {
    const { status, data } = await axios.delete(`/api/drinks/${id}`, {
      headers: { Authorization: jwt },
    });
    if (status === 200) {
      success(data);
    } else {
      error(error);
    }
  } catch (e) {
    return error(e.response.data.error);
  }
};

const getUsers = async () => {
  try {
    const { status, data } = await axios.get("/api/auth/users");
    if (status === 200) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const editUserStatus = async (id, is_active, jwt, success, error) => {
  try {
    const { status, data } = await axios.put(
      `/api/auth/users/${id}`,
      { is_active },
      { headers: { Authorization: jwt } }
    );

    if (status === 200) {
    } else {
      return error(error);
    }
  } catch (e) {}
};

export default {
  getAlcohols,
  createAlcohol,
  editAlcohol,
  deleteAlcohol,
  getMixers,
  createMixer,
  editMixer,
  deleteMixer,
  getDrinks,
  createDrink,
  editDrink,
  deleteDrink,
  signin,
  getUsers,
  editUserStatus,
  createUser,
};
