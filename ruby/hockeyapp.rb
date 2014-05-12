require 'optparse'
require 'hockeyapp'
require 'pp'
require 'irb/completion'

options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: hockeyapp.rb [options]"

  opts.on('-t', '--token TOKEN', 'Upload Token') { |v| options[:token] = v }
  opts.on('-a', '--app_id APP_ID', 'Application ID') { |v| options[:app_id] = v }
  opts.on('-f', '--file FILE_PATH', 'File path (ipa,apk,zip)') { |v| options[:file] = v }
  opts.on('--notes NOTES', '(optional) Relase notes') { |v| options[:notes] = v }
  opts.on('--notify NOTIFY', '(optional) Notify testers?') { |v| options[:notify] = v }
  opts.on('--status STATUS', '(optional) Download status') { |v| options[:status] = v }
  opts.on('--tags STATUS', '(optional) Tags') { |v| options[:tags] = v }

end.parse!

# Default options
options[:notes] = 'New release' if options[:notes].nil?
options[:notify] = 2 if options[:notify].nil? # default: notify all testers
options[:status] = 2 if options[:status].nil? # default: allow to download
options[:tags] = '' if options[:tags].nil?


# Raise an exception if we have not found required options
raise "--token argument is required" if options[:token].nil?
raise "--app_id argument is required" if options[:app_id].nil?
raise "--file argument is required" if options[:file].nil?


# Configure
HockeyApp::Config.configure do |config|
  config.token = options[:token] 
end

# Make client
client = HockeyApp.build_client

# Find our app
app = nil
client.get_apps.each do |a|
    if a.public_identifier == options[:app_id]
      app = a
    end
end
raise "No such app: " + options[:app_id] if app.nil?

# Read file
raise "No such file: " + options[:file] if not File.exist?(options[:file])

file = File.new(options[:file], 'r')

# Create version
app.create_version(file, options[:notes], options[:notify], options[:status], options[:tags])