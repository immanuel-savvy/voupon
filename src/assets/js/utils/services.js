import { domain } from "./constants";

const get_request = async (path) => {
  if (path && path.startsWith("/")) path = path.slice(1);
  try {
    let ftch = await fetch(`${domain}/${path}`);
    let res;
    try {
      res = await ftch.json();
    } catch (e) {
      return { _$not_sent: true };
    }

    return res && res.data;
  } catch (e) {
    console.log(e, domain);
  }
};

const upload_file = async (file) => {
  let form_data = new FormData();
  if (!Array.isArray(file)) file = new Array(file);
  file.map((f, index) => form_data.append(`file${index}`, f));

  try {
    let ftch = await fetch("/upload_file", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      body: form_data,
    });
    let res;
    try {
      res = await ftch.json();
    } catch (e) {
      return { _$not_sent: true };
    }

    return res.data;
  } catch (e) {
    console.log(e, domain);
    return null;
  }
};

const post_request = async (path, data) => {
  if (path && path.startsWith("/")) path = path.slice(1);
  try {
    let ftch = await fetch(`${domain}/${path}`, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data && JSON.stringify(data),
    });

    let res;
    try {
      res = await ftch.json();
    } catch (e) {
      return { _$not_sent: true };
    }

    return res && res.data;
  } catch (e) {
    console.log(e, domain);
    return path, data;
  }
};

export { post_request, upload_file, get_request, domain };
