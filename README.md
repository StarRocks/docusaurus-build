# docusaurus-build

This is a test-harness for Docusaurus v3. It is meant to be pulled by a GitHub
workflow and used to test Markdown files.

## Example workflow

This workflow goes into the repo that contains your Markdown files. It pulls the slimmed down Docusaurus v3 files from this repo, and then it pulls the repo that contains your Markdown files.

When it pulls the Markdown files it checks them out into a directory named `docs`. If your Markdown files are already in a dir named `docs/`, then adjust the `path:` line of the workflow.

The `docusaurus_config.js` file has both broken link settings set to `throw` as we don't tolerate broken links. There is one sample Markdown file in our doc repos (`README.md`) that contains example markdown links that are invalid. I was surprised that these caused failures since they are in backticks, but they do. There is a `run rm README.md` in the workflow to avoid this issue.

Unfortunately the link checking of Docusaurus does not catch links missing the `.md` extension. Lychee to the rescue in the workflow below.

```
name: testbuild document site

on: [push]

jobs:
  PR_check:
    runs-on: ubuntu-latest
    #defaults:
      #run:
        #working-directory: ./doctest
    steps:
      # This first checkout gets the test setup
      # which is basically a default Docusaurus
      # build with the broken links checks set
      # to throw an exception.
      - uses: actions/checkout@v4
        with:
          repository: 'StarRocks/docusaurus-build'

      # this second checkout gets the docs from this
      # repo and checks them out to a dir named:
      # `docs`
      - uses: actions/checkout@v4
        with:
          path: 'docs'

      # The README file has some sample markdown that fails
      # link checking
      - run: rm ./docs/README.md

      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: docusaurus-mdx-checker
        if: always()
        run: |
          npx docusaurus-mdx-checker -c docs

      - name: link check
        if: always()
        uses: lycheeverse/lychee-action@v1.8.0
        with:
          fail: true
          args: >
            --config docs/lychee.toml
            --offline "docs/**/*.md"

      - run: yarn install --frozen-lockfile
      - run: yarn build
```

