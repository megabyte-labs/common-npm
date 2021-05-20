# eslint rules notes

https://github.com/typescript-eslint/typescript-eslint/blob/1c1b572c3000d72cfe665b7afbada0ec415e7855/packages/eslint-plugin/ROADMAP.md

- `unicorn/no-array-reduce`  
  This rule conflicts with `functional/no-loop-statement` rule. By `no-loop-statement` it discourages to use primitive loops and encourages to use `map` and `reduce` functions.

- 
  `functional/no-class`  
  `functional/no-this-expression`  
  Most of the current code follows object orientation. Thus disabling these rules.

- `functional/no-return-void`  
  To allow to set return type `void` disable this rule.

- `functional/no-throw-statement`  
  Because this conflicts with type checking.  
  Study the below case

  ```typescript
    const matches = /\[\d+\w([^[]+)\[/.exec(string)
    if (!matches) {
      new Error('Unable to determine the OS family')
    }
    const [family, version] = matches[1].split('-')
  ```

  With this rule on, the typescript compiler throw error because matches can be null.  
  `Object is possibly 'null'.ts(2531)` at line 5

  So this rule must be ignored and allow to use throw as below

  ```typescript
    const matches = /\[\d+\w([^[]+)\[/.exec(string)
    if (!matches) {
      throw new Error('Unable to determine the OS family')
    }
    const [family, version] = matches[1].split('-')
  ```

