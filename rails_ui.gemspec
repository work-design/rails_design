require_relative 'lib/rails_ui/version'

Gem::Specification.new do |s|
  s.name = 'rails_ui'
  s.version = RailsUi::VERSION
  s.authors = ['qinmingyuan']
  s.email = ['mingyuan0715@foxmail.com']
  s.homepage = 'https://github.com/work-design/rails_ui'
  s.summary = 'Work Design UI Project'
  s.description = 'Description of RailsUi.'
  s.license = 'MIT'

  s.metadata['homepage_uri'] = s.homepage
  s.metadata['source_code_uri'] = 'https://github.com/work-design/rails_ui'
  s.metadata['changelog_uri'] = 'https://github.com/work-design/rails_ui'

  s.files = Dir[
    '{app,config,db,lib}/**/*',
    'LICENSE',
    'Rakefile',
    'README.md'
  ]

  s.add_dependency 'rails'
end
