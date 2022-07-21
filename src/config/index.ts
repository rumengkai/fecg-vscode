const axios = require("axios");
let data: PlopList = require("./data.json");

const dataPath =
  "https://raw.githubusercontent.com/rumengkai/fecg-templates/main/templates/data.json";

export const getTplData = async (): Promise<any[]> => {
  // 从远程获取模板列表
  const res = await axios.get(dataPath).catch((error: any) => {
    console.error("error:", error);
  });
  if (res && res.status === 200 && res.data) {
    data = res.data;
  }
  if (data) {
    return data;
  } else {
    return [];
  }
};

export type PlopList = PlopItem[];

export type PlopItem = {
  name?: string;
  description?: string;
  templateFiles?: string[]; // 模板文件，数组形式，可以写多个文件。
  children?: PlopItem[];
  isGeneral?: boolean;
  isFolder?: boolean;
};
