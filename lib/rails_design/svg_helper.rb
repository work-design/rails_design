module SvgHelper
  NOKOGIRI_SAVE_OPTIONS = {
    save_with: Nokogiri::XML::Node::SaveOptions::DEFAULT_XML | Nokogiri::XML::Node::SaveOptions::NO_DECLARATION
  }.freeze
  extend self

  def icons_hash
    Rails::Engine.subclasses.each_with_object({}) do |engine, h|
      icon_path = engine.root.join('config/icons.yml')
      if icon_path.exist?
        YAML.safe_load_file(icon_path).each do |k, v|
          h[k] ||= []
          h[k].concat v
        end
      end
    end
  end

  def builder
    icons_hash.each do |kind, icons|
      builder = svg_builder
      defs = builder.doc.css('defs').first
      icons.each do |icon|
        defs << svg_parse(icon, kind: kind)
      end
      r = Nokogiri::XML(builder.to_xml) {|doc| doc.default_xml.noblanks }.to_xml(NOKOGIRI_SAVE_OPTIONS.dup.merge(indent: 2))
      Rails.root.join('app/assets/images', "icons_#{kind}.svg").write r
    end
  end

  def svg_parse(name, kind: 'regular')
    svg_content = Rails.root.join('public/svgs', kind, "#{name}.svg").read
    xml = Nokogiri::XML(svg_content)
    svg = xml.css('svg')[0]
    svg.clone.tap do |node|
      node.name = 'symbol'
      node.set_attribute :id, name
    end
  end

  def svg_builder
    Nokogiri::XML::Builder.new(encoding: 'UTF-8') do |xml|
      xml.svg(xmlns: 'http://www.w3.org/2000/svg', style: 'display: none') do |svg|
        svg.defs {}
      end
    end
  end

  def add_symbols(defs)

  end

end