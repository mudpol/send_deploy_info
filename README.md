# TeamCity pushgateway proxy
TeamCity pushgateway proxy - sending metrics about TeamCity build to Prometheus pushgateway.
Proxy accepting **POST** request from TeamCity Web-Hooks in ***"Legacy Webhook (JSON)"*** payload format. After that from JSON witch contain information about build, forming POST request to pushgateway in Prometheus format  with information: 
- Commit
- Comment
- BuildName
- ProjectName
- FullProjectName
- BuildTriggeredBy
- BuildResult
- BuildNotifyType
- BuildResultDelta
- BuildNumber
