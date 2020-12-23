module.exports = {
  "plugin": [
    "stylelint-scss",
  ],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-idiomatic-order",
    "stylelint-a11y/recommended",
    "stylelint-config-css-modules"
  ],
  "rules": {
    "at-rule-no-unknown": [true, {ignoreAtRules: ["use", "forward", "include", "function", "mixin", "each", "return"]}],
    "font-family-no-missing-generic-family-keyword": [true, { ignoreFontFamilies: ["icomoon", "green-icon"]}]
  }
}
