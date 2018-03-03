import $ from 'jquery';
let yaml = require('front-matter');
const asset_url = ASSET_URL;
class PostLoader {
  constructor(path) {
    // console.log(asset_url);
    return new Promise((resolve) => {
      $.get(asset_url + 'posts/' + path, (result) => {
        var res;
        try {
          res = yaml(result);
        } catch (error) {
          console.log('YAML PARSE ERROR in :', path, error.message);
        }
        res.path = path.slice(0, -3);
        resolve(res);
      });
    });
  }
}

export default PostLoader;
