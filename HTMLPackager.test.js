const Bundler = require('parcel-bundler');
const posthtml = require('posthtml');
const makeHTMLPackager = require('./HTMLPackager');

const createPackager = ({publicUrl}) => {
  const bundler = new Bundler(undefined, {publicUrl});
  const SuperHTMLPackager = bundler.packagers.get('html');
  const mockBundle = {getHashedBundleName: () => ''};
  const HtmlPackager = makeHTMLPackager(SuperHTMLPackager);
  htmlPackager = new HtmlPackager(mockBundle, bundler);

  return htmlPackager;
};

test('it replaces index.html in "a" tags', async () => {
  const htmlPackager = createPackager({publicUrl: '/'});

  const example = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="/contact/index.html">test</a>'
  );

  expect(example.html).toBe('<a href="/contact/">test</a>');

  const example2 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="/contact/index.html?test=1">test</a>'
  );

  expect(example2.html).toBe('<a href="/contact/?test=1">test</a>');

  const example3 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="/contact/index.html#hash">test</a>'
  );

  expect(example3.html).toBe('<a href="/contact/#hash">test</a>');
});

test('it replaces index.html in "link" tags', async () => {
  const htmlPackager = createPackager({publicUrl: '/'});

  const example = await posthtml(htmlPackager.removeIndexHTML).process(
    '<link href="/contact/index.html" rel="canonical">'
  );

  expect(example.html).toBe('<link href="/contact/" rel="canonical">');
});

test('it does not replace index.html in other contexts', async () => {
  const htmlPackager = createPackager({publicUrl: '/'});

  const example1 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="https://www.example.com/index.html">test</a>'
  );

  expect(example1.html).toBe(
    '<a href="https://www.example.com/index.html">test</a>'
  );

  const example2 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<form action="/contact/index.html"></form>'
  );

  expect(example2.html).toBe('<form action="/contact/index.html"></form>');

  const example3 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<p>This is a sample text mentioning index.html</p>'
  );

  expect(example3.html).toBe(
    '<p>This is a sample text mentioning index.html</p>'
  );
});

test('it supports absolute links depending on publicUrl option', async () => {
  const htmlPackager = createPackager({publicUrl: 'http://local.dev'});

  const example1 = await posthtml(
    htmlPackager.removeIndexHTML.bind(htmlPackager)
  ).process('<a href="http://local.dev/contact/index.html"></a>');

  expect(example1.html).toBe('<a href="http://local.dev/contact/"></a>');

  const example2 = await posthtml(
    htmlPackager.removeIndexHTML.bind(htmlPackager)
  ).process('<a href="http://local.dev/contact/index.html?test=1"></a>');

  expect(example2.html).toBe('<a href="http://local.dev/contact/?test=1"></a>');

  const example3 = await posthtml(
    htmlPackager.removeIndexHTML.bind(htmlPackager)
  ).process('<a href="http://local.dev/contact/index.html#hash"></a>');

  expect(example3.html).toBe('<a href="http://local.dev/contact/#hash"></a>');
});

test('it supports relative links depending on publicUrl option', async () => {
  const htmlPackager = createPackager({publicUrl: '.'});

  const example1 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="contact/index.html"></a>'
  );

  expect(example1.html).toBe('<a href="contact/"></a>');

  const example2 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="contact/index.html?test=1">test</a>'
  );

  expect(example2.html).toBe('<a href="contact/?test=1">test</a>');

  const example3 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="contact/index.html#hash">test</a>'
  );

  expect(example3.html).toBe('<a href="contact/#hash">test</a>');
});

test('it supports relative links even when the entire href is index.html', async () => {
  const htmlPackager = createPackager({publicUrl: '.'});

  const example1 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="./"></a>'
  );

  expect(example1.html).toBe('<a href="./"></a>');

  const example2 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="index.html?test=1">test</a>'
  );

  expect(example2.html).toBe('<a href="./?test=1">test</a>');

  const example3 = await posthtml(htmlPackager.removeIndexHTML).process(
    '<a href="index.html#hash">test</a>'
  );

  expect(example3.html).toBe('<a href="./#hash">test</a>');
});
