curl -XPUT http://localhost:9200/_template/tessel-ambient -d '
{
  "template": "tessel-ambient-*",
  "settings": {
    "number_of_shards": 1
  },
  "mappings": {
    "ambient": {
      "properties": {
        "light": {
          "type": "float",
          "index": "not_analyzed"
        },
        "sound": {
          "type": "float",
          "index": "not_analyzed"
        },
        "timestamp": {
          "type": "date"
        }
      }
    }
  }
}
'
