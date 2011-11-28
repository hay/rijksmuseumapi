<?php
class EventBasedClass {
    private $eventHandlers = array();

    public function emit($type, $data = false) {
        if (isset($this->eventHandlers[$type])) {
            foreach ($this->eventHandlers[$type] as $handler) {
                if ($data) {
                    $handler($data);
                } else {
                    $handler(false);
                }
            }
        }
    }

    public function on($type, $handler) {
        if (isset($this->eventHandlers[$type])) {
            $this->eventHandlers[$type][] = $fn;
        } else {
            $this->eventHandlers[$type] = array($handler);
        }
    }
}