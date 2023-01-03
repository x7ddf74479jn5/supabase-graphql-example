import { CodegenConfig } from "@graphql-codegen/cli";
import { supabaseAnonKey, supabaseUrl } from "../lib/supabase";

const config: CodegenConfig = {
  // SupabaseのGraphQLエンドポイント
  // `apikey`パラメーターは手前のAPI Gatewayを通るのに必要
  schema: `${supabaseUrl}/graphql/v1?apikey=${supabaseAnonKey}`,

  // 型を生成するクエリーがどこのファイルに記載されているか。
  documents: ["**/*.tsx", "**/*.ts"],

  // 出力したファイルをどこに置くかの指定
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
