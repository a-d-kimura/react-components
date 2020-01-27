const postcss = require('postcss');

const toDeclNode = (cssObj) => Object.entries(cssObj).map(
  css => postcss.decl({ prop: css[0], value: css[1] })
)

const typographyTypes = {
  xlarge: {
    'font-size': '20px',
    'font-weight': '600',
    'font-family': "\'Noto Sans JP\', Roboto, sans-serif",
    'letter-spacing': '0.2em',
  },
  large: {
    'font-size': '18px',
    'font-weight': '500',
    'font-family': "\'Noto Sans JP\', Roboto, sans-serif",
    'letter-spacing': '0.2em',
  },
  normal: {
    'font-size': '16px',
    'font-weight': '400',
    'font-family': "\'Noto Sans JP\', Roboto, sans-serif",
    'letter-spacing': '0.2em',
  },
  small: {
    'font-size': '14px',
    'font-weight': '300',
    'font-family': "\'Noto Sans JP\', Roboto, sans-serif",
    'letter-spacing': '0.2em',
  },
  xsmall: {
    'font-size': '12px',
    'font-weight': '200',
    'font-family': "\'Noto Sans JP\', Roboto, sans-serif",
    'letter-spacing': '0.2em',
  },
}

// TODO: 数が増えたら外だしする。
const mixins = {
  typography: (type = 'normal') => toDeclNode(typographyTypes[type]),
  lineEllipsis: () => toDeclNode({
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    'overflow': 'hidden'
  }),
  verticalAlign: (pos = 50) => toDeclNode({
    position: 'relative',
    top: `${pos}%`,
    transform: `translateY(-${pos}%)`,
  }),
  /* TODO: font対応
  fontFace: (name, file) => toDeclNode({
    'font-family': `${name}`,
    src: `url("../fonts/${file}.eot")`,
    src: `url("../fonts/${file}.eot?#iefix") format("embedded-opentype"),
      url("../fonts/${$file}.woff") format("woff"),
      url("../fonts/${$file}.ttf") format("truetype"),
      url("../fonts/${$file}.svg?#webfont") format("svg")`
  })
  */
};

module.exports = postcss.plugin('mixin', function(opts = {}) {
  /* 例1, 単純なcustome decl(prop)の追加 e.g. hoge: red -> color: red
  return function(root) {
    root.walkDecls(function (decl) {
      if (decl.prop === 'hoge1') {
        decl.cloneBefore(decl.clone({prop: 'color'}));
        decl.remove();
      }
    });
    return root;
  })
  */
  /* 例2, 単純なatRuleの追加 e.g. @function data 10 -> --data: 10(元の@function行は削除)
  return function(root) {
    root.walkAtRules('function', node => {
      const params = node.params.split(' ');
      node.after({ prop: '--' + params[0], value: params[1] });
      node.remove();
    });
    return root;
  }
  */
  // @mixin name arg1 arg2 ...
  return function(root) {
    root.walkAtRules('mixin', node => {
      const params = node.params.split(/\s+/);
      const name = params.shift();

      if (name in mixins) {
        const newNodes = (params.length !== 0) ? mixins[name].apply(this, params) : mixins[name]()
        node.after(newNodes)
      }

      node.remove();
    });

    return root;
  }
})
