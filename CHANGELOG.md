# Changelog
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
## [Unreleased]
### Added
- `brand/`: JAG Brand Template v1.1, published from the author's local copy
- `front-matter/00-rights.md`, `chapters/99-references.md` (APA 7), `CITATION.cff`
- The PDF also builds on pull requests, so a chapter is checked before it lands
### Changed
- Book text under CC BY 4.0, code examples under MIT
- The PDF build includes `front-matter/` before the chapters
### Fixed
- Chapters are passed to pandoc as separate files instead of `cat`: a chapter without a final
  newline no longer swallows the next chapter's title
## [Edition 1] - YYYY-MM-DD
### Added
- Initial book structure
