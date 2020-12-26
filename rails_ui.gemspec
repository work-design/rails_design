require_relative 'lib/rails_ui/version'

Gem::Specification.new do |s|
  s.name = 'rails_ui'
  s.version = RailsUi::VERSION
  s.authors = ['qinmingyuan']
  s.email = ['mingyuan0715@foxmail.com']
  s.homepage = 'https://github.com/work-design/rails_ui'
  s.summary = 'Summary of RailsUi.'
  s.description = 'Description of RailsUi.'
  s.license = 'LGPL-3.0'

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  s.metadata['allowed_push_host'] = 'https://rubygems.org'

  s.metadata['homepage_uri'] = s.homepage
  s.metadata['source_code_uri'] = ''
  s.metadata['changelog_uri'] = ''

  s.files = Dir[
    '{app,config,db,lib}/**/*',
    'LICENSE',
    'Rakefile',
    'README.md'
  ]

  s.add_dependency 'rails'
end
