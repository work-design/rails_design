module RailsDesign::IconHelper

  def svg_tag(name, kind: 'regular', **options)
    content_tag :svg, options.with_defaults(class: 'icon is-small') do
      content_tag :use, nil, 'href' => "#{asset_path "icons_#{kind}.svg", host: request.host_with_port}##{name}"
    end
  end

  def svg_data_url(path = 'placeholder.svg')
    svg_content = Rails.application.assets.resolver.read path
    base64_svg = Base64.strict_encode64(svg_content)
    "data:image/svg+xml;base64,#{base64_svg}"
  end

end
