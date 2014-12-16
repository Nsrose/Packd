package averages;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Stack;

/** Class for computing weighted averages of data as it comes in.
    @author Nick Rose.*/
public class Averages {
    /** The data structure encompassing all averages of the week.*/
    private List<List<Stack<InfoNode>>> averages;

    /** Map of day strings to their indices in the averages structure.*/
    private HashMap<String, Integer> dayIndices;

    /** Makes a new averages. */
    public Averages() {
        averages = new ArrayList<List<Stack<InfoNode>>>();
        dayIndices = new HashMap<>();
        dayIndices.put("Sunday", 0);
        dayIndices.put("Monday", 1);
        dayIndices.put("Tuesday", 2);
        dayIndices.put("Wednesday", 3);
        dayIndices.put("Thursday", 4);
        dayIndices.put("Friday", 5);
        dayIndices.put("Saturday", 6);
    }

    /** Add a new infonode to me. If the stack grows too large,
        recalculate averages by removing InfoNodes using expected values
        until size of stack is 1, and assign the remaining infoNode's measure
        to the new expected value. */
    public void add(InfoNode n) {
        String day = n.getDay();
        int hour = n.getHour();
        int measure = n.getMeasure();
        Stack<InfoNode> s = getHourData(day, hour);
        InfoNode previous = s.peek();
        s.push(n);
        if (s.size() > 100) {
            // RECALCULATE
        }
    }

    /** Return a list of the data from DAY string. */
    public List<Stack<InfoNode>> getDayData(String day) {
        int dayIndex = getDayIndex(day);
        return averages.get(dayIndex);
    }

    /** Return a stack of infonodes from the hour HOUR on day DAY. */
    public Stack<InfoNode> getHourData(String day, int hour) {
        int dayIndex = getDayIndex(day);
        int hourIndex = getHourIndex(hour);
        return averages.get(dayIndex).get(hourIndex);
    }

    /** Return the int representing this DAY. */
    private int getDayIndex(String day) {
        return dayIndices.get(day);
    }

    /** Return the int representing this HOUR. */
    private int getHourIndex(int hour) {
        return (hour - 600) / 100;
    }
}
