/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/todo_prog.json`.
 */
export type TodoProg = {
  address: "2vjxr1Q34KmKQjFjj8PmzAo2FfpgddYq5yY7NZx9ZxZr";
  metadata: {
    name: "todoProg";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "addTodo";
      discriminator: [188, 16, 45, 145, 4, 5, 188, 75];
      accounts: [
        {
          name: "userProfile";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [85, 83, 69, 82, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "todoAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [84, 79, 68, 79, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              },
              {
                kind: "account";
                path: "user_profile.last_todo";
                account: "userProfile";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["userProfile"];
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "content";
          type: "string";
        }
      ];
    },
    {
      name: "editTodo";
      discriminator: [12, 78, 26, 173, 88, 39, 199, 147];
      accounts: [
        {
          name: "userProfile";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [85, 83, 69, 82, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "todoAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [84, 79, 68, 79, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              },
              {
                kind: "arg";
                path: "todoIdx";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["userProfile", "todoAccount"];
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "todoIdx";
          type: "u8";
        },
        {
          name: "content";
          type: "string";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "userProfile";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [85, 83, 69, 82, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "markTodo";
      discriminator: [70, 24, 206, 243, 92, 29, 249, 110];
      accounts: [
        {
          name: "userProfile";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [85, 83, 69, 82, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "todoAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [84, 79, 68, 79, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              },
              {
                kind: "arg";
                path: "todoIdx";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["userProfile", "todoAccount"];
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "todoIdx";
          type: "u8";
        },
        {
          name: "checked";
          type: "bool";
        }
      ];
    },
    {
      name: "removeTodo";
      discriminator: [28, 167, 91, 69, 25, 225, 253, 117];
      accounts: [
        {
          name: "userProfile";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [85, 83, 69, 82, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "todoAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [84, 79, 68, 79, 95, 83, 84, 65, 84, 69];
              },
              {
                kind: "account";
                path: "authority";
              },
              {
                kind: "arg";
                path: "todoIdx";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["userProfile", "todoAccount"];
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "todoIdx";
          type: "u8";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "todoAccount";
      discriminator: [31, 86, 84, 40, 187, 31, 251, 132];
    },
    {
      name: "userProfile";
      discriminator: [32, 37, 119, 205, 179, 180, 13, 194];
    }
  ];
  types: [
    {
      name: "todoAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "idx";
            type: "u8";
          },
          {
            name: "content";
            type: "string";
          },
          {
            name: "checked";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "userProfile";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "lastTodo";
            type: "u8";
          },
          {
            name: "todoCount";
            type: "u8";
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "todoTag";
      type: "bytes";
      value: "[84, 79, 68, 79, 95, 83, 84, 65, 84, 69]";
    },
    {
      name: "userTag";
      type: "bytes";
      value: "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]";
    }
  ];
};
