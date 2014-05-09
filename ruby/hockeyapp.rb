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

end.parse!

#Now raise an exception if we have not found required options
raise "--token argument is required" if options[:token].nil?
raise "--app_id argument is required" if options[:app_id].nil?
raise "--file argument is required" if options[:file].nil?


puts options

HockeyApp::Config.configure do |config|
  config.token = options[:token] 
end

client = HockeyApp.build_client

app = HockeyApp::App.from_hash(options[:app_id], client)


file = File.new(options[:file], 'r')


app.create_version(file)