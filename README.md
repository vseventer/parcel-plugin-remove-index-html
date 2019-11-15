# parcel-plugin-remove-index-html
> Remove `index.html` from internal links in Parcel's build output.

[Parcel][parcel] is great, but unfortunately the HTML build output will include a trailing `index.html` for internal links. This plugin will strip `index.html` from `<a>` and `<link>` tags using [PostHTML][posthtml], making your URLs beautiful again. External URLs not part of your Parcel build will be left untouched.

## Examples
Things this plugin will replace:
* `<a href="/contact/index.html">` to `<a href="/contact/">`.
* `<link href="/contact/index.html" rel="canonical" />` to `<link href="/contact/" rel="canonical" />`.
* `<a href="http://local.dev/contact/index.html">` to `<a href="http://local.dev/contact/">` if using Parcel's `--public-url http://local.dev` flag.

Things this plugin will not replace:
* `<a href="https://www.example.com/index.html">`
* `<p>This is a sample text mentioning index.html</p>`

## Installation
Depending on which package manager you use, either:
* `$ npm install --save-dev parcel-plugin-remove-index-html`
* `$ yarn add --dev parcel-plugin-remove-index-html`

## Usage
Parcel automatically picks up on this plugin, and no further action is required on your part.

## Related
* [parcel-plugin-strip-html](https://www.npmjs.com/package/parcel-plugin-strip-index-html): removes `index.html` from the entire source (i.e. not only `<a>` and `<link>` tags) using string replacement. This plugin will replace things you might not expect (see above).

## Changelog
See the [Changelog](./CHANGELOG.md) for a list of changes.

## License
    The MIT License (MIT)

    Copyright (c) 2019 Mark van Seventer

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[parcel]: https://parceljs.org/
[posthtml]: https://github.com/posthtml/posthtml
