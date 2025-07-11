module RailsDesign::IconHelper

  def svg_tag(name, **options)
    content_tag :svg, options do
      content_tag :use, nil, 'href' => "#{asset_path 'icons.svg', host: request.host_with_port}##{name}"
    end
  end

  def svg_light_tag(name, **options)
    content_tag :svg, options do
      content_tag :use, nil, 'href' => "#{asset_path 'icons_light.svg', host: request.host_with_port}##{name}"
    end
  end

  def svg_regular_tag(name, **options)
    content_tag :svg, options do
      content_tag :use, nil, 'href' => "#{asset_path 'icons_regular.svg', host: request.host_with_port}##{name}"
    end
  end

end
