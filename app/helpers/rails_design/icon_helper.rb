module RailsDesign::IconHelper

  def svg_tag(name, **options)
    content_tag :svg, options do
      content_tag :use, nil, 'href' => "#{asset_path 'icons.svg'}##{name}"
    end
  end

  def svg_light_tag(name, **options)
    content_tag :svg, options do
      content_tag :use, nil, 'href' => "#{asset_path 'icons_light.svg'}##{name}"
    end
  end

end
