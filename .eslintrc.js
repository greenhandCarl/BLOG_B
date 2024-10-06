module.exports = {
    parser: '@typescript-eslint/parser', // ts需要额外下载的解析器 他只是一个解析器 不做eslint校验， 如果需要校验需要下载额外的plugin来校验
    parserOptions: {
        "project": "tsconfig.json",
        ecmaFeatures: { // es特性配置
            jsx: true, // 启用jsx
            globalReturn: true // 允许在全局作用域下使用return语句
        },
        ecmaVersion: 'latest'
    },
    plugins: [ // 这些就是一些额外的校验插件
        "@typescript-eslint", // 这是下载了一个 '@typescript-eslint/eslint-plugin' 插件， 他可以定义大多数rules
    ],
    extends: [
        "eslint:recommended", // eslint团队推荐的所有项目规则集
        "plugin:@typescript-eslint/recommended", // 启用@typescript-eslint/eslint-plugin插件中推荐的用法
    ],
    ignorePatterns: ['**/.eslintrc.js', '/config/**', '**/postcss.config.js'],
    rules: {
        // 4个空格缩进
        "@typescript-eslint/indent": ["error", 4, {
            "SwitchCase": 1,
            "VariableDeclarator": "first",
            "outerIIFEBody": 1,
            "MemberExpression": 1,
            "FunctionDeclaration": {
                "body": 1,
                "parameters": 1
            },
            "FunctionExpression": {
                "body": 1,
                "parameters": 1
            },
            "CallExpression": {
                "arguments": 1
            },
            "ArrayExpression": 1,
            "ObjectExpression": 1,
            "ImportDeclaration": 1,
            "flatTernaryExpressions": true,
            "offsetTernaryExpressions": true,
            "ignoredNodes": ["ConditionalExpression"],
            "ignoreComments": false
        }],
        // 函数空格
        "space-before-function-paren": "off", // 禁止掉普通eslint规则以开启ts中的eslint规则
        "@typescript-eslint/space-before-function-paren": ["error", { // 函数名后要加一个空格
            "anonymous": "always",
            "named": "always",
            "asyncArrow": "always"
        }],
        // 禁止不连续的函数重载
        "@typescript-eslint/adjacent-overload-signatures": ["error"],
        // 禁止不统一的array type定义
        "@typescript-eslint/array-type": ["error", {
            "default": "array",
            "readonly": "array"
        }],
        // 禁止使用@ts-nocheck等注释
        "@typescript-eslint/ban-ts-comment": ["error", {
            // "minimumDescriptionLength": 1000,
            "ts-expect-error": true,
            "ts-ignore": true,
            "ts-nocheck": true,
            "ts-check": false
        }],
        // 禁止tslint的注释
        "@typescript-eslint/ban-tslint-comment": ["error"],
        // 禁止一些类型
        "@typescript-eslint/ban-types": ["error", {
            "types": {
                "String": {
                    "message": "Use string instead",
                    "fixWith": "string"
                },
                "Boolean": {
                    "message": "Use boolean instead",
                    "fixWith": "boolean"
                },
                "Number": {
                    "message": "Use number instead",
                    "fixWith": "number"
                },
                "Symbol": {
                    "message": "Use symbol instead",
                    "fixWith": "symbol"
                },
                "Function": {
                    "message": "The `Function` type accepts any function-like value.\nIt provides no type safety when calling the function, which can be a common source of bugs.\nIt also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.\nIf you are expecting the function to accept certain arguments, you should explicitly define the function shape.",
                },
                "Object": {
                    "message": "Use object instead",
                },
                "{}": {
                    "message": "`{}` actually means \"any non-nullish value\".\n- If you want a type meaning \"any object\", you probably want `object` instead.\n- If you want a type meaning \"any value\", you probably want `unknown` instead.",
                },
            },
            "extendDefaults": false
        }],
        // 禁止不一致的字面量字段的定义风格
        "@typescript-eslint/class-literal-property-style": ["error", "fields"],
        // 禁止使用Record以外的语法来定义索引对象
        "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
        // 禁止随意使用类型断言，且断言必需是as语法
        "@typescript-eslint/consistent-type-assertions": ["error", {
            "assertionStyle": "as",
            "objectLiteralTypeAssertions": "never"
        }],
        // 禁止promise函数省略async
        "@typescript-eslint/promise-function-async": ["error", {
            "allowAny": true,
            "allowedPromiseNames": ["Thenable", "Bluebird"],
            "checkArrowFunctions": true,
            "checkFunctionDeclarations": true,
            "checkFunctionExpressions": true,
            "checkMethodDeclarations": true
        }],
        // 禁止在能使用startWith和endWith时使用其它方式来判断子字符串
        "@typescript-eslint/prefer-string-starts-ends-with": ["error"],
        // 禁止使用三线表达式
        "@typescript-eslint/triple-slash-reference": ["error"],
    },
}
