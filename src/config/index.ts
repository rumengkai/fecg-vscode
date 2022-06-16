const axios = require("axios");
let data: PlopList = require("./data.json");

export const getPageTypes = async () => {
  // 从远程获取模板列表
  const res = await axios
    .get(
      "https://raw.githubusercontent.com/rumengkai/fecg/main/src/templates/data.json"
    )
    .catch((error: any) => {
      console.error("error:", error);
    });
  if (res && res.status === 200 && res.data) {
    data = res.data;
  }
  if (data) {
    return data.map((item) => {
      return `${item.name}: ${item.description}`;
    });
  } else {
    return [];
  }
};

export declare type PlopList = {
  name?: string;
  description?: string;
  templateFiles?: string[];
}[];
