Gem::Specification.new do |s|
  s.name = 'rails_design'
  s.version = '0.0.1'
  s.authors = ['qinmingyuan']
  s.email = ['mingyuan0715@foxmail.com']
  s.homepage = 'https://github.com/work-design/rails_design'
  s.summary = 'Work Design UI Project'
  s.description = 'Description of RailsUi.'
  s.license = 'MIT'

  s.metadata['homepage_uri'] = s.homepage
  s.metadata['source_code_uri'] = 'https://github.com/work-design/rails_design'
  s.metadata['changelog_uri'] = 'https://github.com/work-design/rails_design'

  s.files = Dir[
    '{app,config,db,lib}/**/*',
    'LICENSE',
    'Rakefile',
    'README.md'
  ]

  s.add_dependency 'rails'
end
