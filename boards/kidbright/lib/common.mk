ifndef RELEASE_DIR
RELEASE_DIR=lib/release
endif

CFLAGS+=-I$(RELEASE_DIR)/kidbright32/include -I$(RELEASE_DIR)/netpie/include

LDFLAGS+=-L$(RELEASE_DIR)/kidbright32 -lkidbright32 -L$(RELEASE_DIR)/netpie -lnetpie
