while(1) {
  if (ht16k33.idle()) { ht16k33.scroll((char *)"Hello World!", true); }
  vTaskDelay(500 / portTICK_RATE_MS);
}
