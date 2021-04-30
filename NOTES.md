# eslint rules notes

- `no-return-void`  
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