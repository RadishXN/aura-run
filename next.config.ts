import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // 如果您部署在 GitHub Pages 的二级目录（例如 https://username.github.io/repo-name/），
  // 请取消下方两行的注释，并将 'repo-name' 修改为您的 GitHub 仓库名称：
  // basePath: "/repo-name",
  // images: { unoptimized: true }
};

export default nextConfig;
