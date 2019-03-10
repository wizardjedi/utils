import React, {Component} from 'react';
import SimpleHexDump from "../../HexDump/SimpleHexDump";

class TestHexDumpPage extends Component {
    render() {
        let buf =
            Buffer
                .from(
                    [
                        0,1,5,4,87,8,9,6,4,64,6,46,46,4,6,13,13,4,8,4,1,31,3,165,4,4,8,31,31,68,4,4,
                        0,1,5,4,87,8,9,6,4,64,6,46,46,4,6,13,13,4,8,4,1,31,3,165,4,4,8,31,31,68,4,4,
                        0,1,5,4,87,8,9,6,4,64,6,46,46,4,6,13,13,4,8,4,1,31,3,165,4,4,8,31,31,68,4,4,
                        0,1,5,4,87,8,9,6,4,64,6,46,46,4,6,13,13,4,8,4,1,31,3,165,4,4,8,31,31,68,4,4,
                        0,1,5,4,87,8,9,6,4,64,6,46,46,4,6,13,13,4,8,4,1,31,3,165,4,4,8,31,31,68,4,4,
                        0,1,5,4,87,8,9,6,4,64,6,46,46,4,6,13,13,4,8,4,1,31,3,165,4,4,8,31,31,68,4,4,
                        0,1,5,4,87,8,9,6,4,64,6,46,46,4,6,13,13,4,8,4,1,31,3,165,4,4,8,31,31,68,4,4,
                    ]);

        console.log(buf.byteLength);

        let groups = [
            {offset: 0, length: 1, name:"serviceType"},
            {offset: 1, length: 1, name:"sourceAddrTon"},
            {offset: 2, length: 1, name:"sourceAddrNpi"},
            {offset: 3, length: 5, name:"sourceAddr"},
        ];

        return (
            <div>
                <SimpleHexDump
                    hexdump={buf}
                    groups={groups}
                />

                <table>
                    <tr>
                        <td colSpan="3">
                            <span style={{fontSize:"10px"}}>
                                <button className="btn btn-xs btn-primary">Show offset</button>
                                <button className="btn btn-xs btn-primary">Show dump</button>
                                <button className="btn btn-xs btn-primary">Show characters</button>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style={{paddingRight:"10px"}}>
                            <code>
                                0x000:000<br />
                                0x000:000<br />
                                0x000:000<br />
                                0x000:000<br />
                                0x000:000<br />
                                0x000:000<br />
                                0x000:000<br />
                                0x000:000<br />
                                0x000:000<br />
                                0x000:000<br />
                            </code>
                        </td>
                        <td style={{paddingLeft:"5px",paddingRight:"5px"}}>
                            <code>
                                00 00 00 00 00 00 00 00 00 00 00<br />
                                00 00 00 00 <span className="color-group1" title="serviceType: sms">00 00 00 00 00 00 00<br />
                                00 00 00 <span title="udh" className="color-group2">00 00 00 00 00</span> 00 00 00<br />
                                00 00 00 00 00 00 00 00 00 00 00<br />
                                00 00 00 00 00 00 00 00 00</span> 00 00<br />
                                00 00 00 00 00 00 00 00 00 00 00<br />
                                00 00 00 00 00 00 00 00 00 00 00<br />
                                00 00 00 00 00 00 00 00 00 00 00<br />
                                00 00 00 00 00 00 00 00 00 00 00<br />
                                00 00 00 00 00 00 00 00 00 00 00<br />
                            </code>
                        </td>
                        <td style={{paddingLeft:"10px"}}>
                            <code>
                                A B C D E F G H I J K L<br />
                                A B C D <span className="color-group1" title="serviceType: sms">E F G H I J K L<br />
                                A B C D E F G H I J K L<br />
                                A B C D E F G H I J K L<br />
                                A B C D E F G H I J</span> K L<br />
                                A B C D E F G H I J K L<br />
                                A B C D E F G H I J K L<br />
                                A B C D E F G H I J K L<br />
                                A B C D E F G H I J K L<br />
                                A B C D E F G H I J K L<br />
                            </code>
                        </td>

                    </tr>
                </table>
            </div>
        );
    }
}

export default TestHexDumpPage;